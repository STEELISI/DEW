import os.path
import sys
import re

cwd = os.path.dirname(os.path.realpath(__file__))
parentDir = os.path.abspath(os.path.join(cwd, os.pardir))
sys.path.insert(0, parentDir)
from generator import Generator

class BashGenerator(Generator):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, name="bash", **kwargs)
        self.cflags = dict()
        print("Created bash")

    def generate(self):
        super().generate()
        print("Bash generate")

        self.generateDew()
        self.generateArgParse()
        self.generatePreamble()        
        self.collectConds()
        self.generateActions()

    def generateActions(self):
        sid = 0
        count = dict()
        for s in self.scenario_parsed:
            clist = s[0]
            actor = s[1][0]
            action = s[2][0]
            if s[3] is not None:
                event = s[3][0]
            else:
                event = None
            if clist is not None and len(clist)>0:
                for cond in clist:
                    print(s," waiting for ",cond, " bound to ",self.bindings_parsed[cond], " check ", self.conditions[cond])
                    self.text += self.conditions[cond][0] + " " + str(count[cond]) + "\n"
                    if (self.conditions[cond][0] == "psuccess"):
                        self.text += "status" + str(count[cond]) +"=`cat ~/cmds/$label/status."+str(count[cond])+"`\n"
            
            if clist is not None and len(clist)>0:
                ctext = ""
                for cond in clist:
                    if (self.conditions[cond][0] == "psuccess"):
                        if ctext != "":
                            ctext +=  "|| [ $status" +str(count[cond])+" -ne 0 ] "
                        else:
                            ctext +=  "if [ $status" +str(count[cond])+" -ne 0 ] "
                if ctext != "":
                    self.text += ctext + " ; then \n\t exit 1\nfi\n"
            print("Actor ", actor," action ", action, " event ", event)
            if (self.cflags[action] & 2 > 0):
                self.text += "execute_wait \"" + actor + "\" \"" + self.bindings_parsed[action] +"\" " + str(sid) + " &\n"
            else:
                self.text += "execute_fork \"" + actor + "\" \"" + self.bindings_parsed[action] +"\" " + str(sid) + " &\n"
            if (event is not None):
                count[event] = sid
            sid += 1

    def collectConds(self):
        self.conditions = dict()
        for s in self.scenario_parsed:
            for c in s[2]:
                self.cflags[c] = 0
        for b in self.bindings_parsed:            
            r1 = re.findall(r"(pexists\()(\w+)", self.bindings_parsed[b])
            if len(r1) > 0:
                for r in r1:
                    self.cflags[r[1]] |= 1;
                    self.conditions[b] = ['pexists',r[1]]
            r1 = re.findall(r"(psuccess\()(\w+)", self.bindings_parsed[b])
            if len(r1) > 0:
                for r in r1:
                    self.cflags[r[1]] |= 2;
                    self.conditions[b] = ['psuccess',r[1]]
        for c in self.cflags:
            print("Command ", c, " condition ", self.cflags[c])
        
                
    def generateDew(self):
        self.text += "#!/usr/bin/bash\n"
        self.text += '##################################################################\n#'
        self.text += '# '.join(self.dew.splitlines(True))
        self.text += '##################################################################\n\n'

    def generateArgParse(self):
        vars = { 1: 'proj',  2: 'exp', 3: 'label' }
        vlong = { 1: 'project under which to run',  2: 'experiment under which to run', 3: 'label for the folder where to store results' }
        nvar = 4
        pattern = re.compile("\$")
        for b in self.bindings_parsed:
            r1 = re.findall(r"\$\w+", self.bindings_parsed[b])
            if len(r1) > 0:
                for m in r1:                    
                    vars[nvar] = m.replace("$", "")
                    print("Variable ", vars[nvar])
                    vlong[nvar] = "variable in command " + self.bindings_parsed[b].replace("$","")
                    nvar += 1
        guidance = "Usage: $0"
        for v in vars:
            guidance += " "+vars[v]
        guidance += "\n"
        for v in vars:
            guidance += "\n\t\t"+vars[v]+" - "+vlong[v]
                
        argstring = "if [ \"$#\" -le " + str(nvar-2) + " ]; then\n\tprintf \""+guidance+"\"\n\texit 1\nfi\n\n"
        for v in vars:
            argstring += vars[v] + "=$" + str(v) + "\n"
            
        self.text += argstring
        
            
    def generatePreamble(self):
        self.text += open('bash/bash_preamble.txt', 'r').read()


    def parse(self):
        super().parse()



