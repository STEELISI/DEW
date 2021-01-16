# eth=$(ssh b.cmimic.trafgen "echo \`inet eth exp\`"); echo $eth

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
        # Dictionary of special functions with regex
        # and expansions
        self.special = {
            '(?: |^)(expIP)(?: |$)': 'inet ip exp',
            '(?: |^)(ctlIP)(?: |$)': 'inet ip ctl',
            '(?: |^)(expeth)(?: |$)': 'inet eth exp',
            '(?: |^)(expIP(.*))(?: |$)': 'inet ip exp $node',
            '(?: |^)(expeth(.*))(?: |$)': 'inet eth exp $node',
            '(?: |^)(IP(.*))(?: |$)': 'inet fip exp $node',
            '(?: |^)(epoch)(?: |$)': 'epoch',
            '(?: |^)(proj)(?: |$)': 'pexp -p',
            '(?: |^)(exp)(?: |$)': 'pexp -e',
            '(?: |^)(node)(?: |$)': 'pexp -n',
        }

    def generate(self):
        super().generate()

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

            # only one actor and one action
            actor = s[1][0]
            action = s[2][0]
            
            # this is the event we emit
            if s[3] is not None:
                event = s[3][0]
            else:
                event = None

            if s[4] is not None:
                wait = s[4]
                # variable
                r1 = re.findall(r"\$\w+\d*", s[4])
                if len(r1) > 0:
                    isnum = False
                else:
                    isnum = True
                print("Wait is ", wait, " type of s4 ", type(s[4]), " isnum ", isnum)
            else:
                wait = None
            if clist is not None and len(clist)>0:
                for cond in clist:
                    print(s," waiting for ",cond, " bound to ",self.bindings_parsed[cond], " check ", self.conditions[cond])
                    self.text += self.conditions[cond][0] + " " + str(count[cond]) + "\n"
                    if (self.conditions[cond][0] == "psuccess"):
                        self.text += "status" + str(count[cond]) +"=`cat ~/cmds/$label/status."+str(count[cond])+"`\n"
                    else:
                        self.text += "pex" + str(count[cond]) +"=$(pexists "+str(count[cond])+")\n"
            
            if clist is not None and len(clist)>0:
                ctext = ""
                for cond in clist:
                    if (self.conditions[cond][0] == "psuccess"):
                        if ctext != "":
                            ctext +=  "|| [ $status" +str(count[cond])+" -ne 0 ] "
                        else:
                            ctext +=  "if [ $status" +str(count[cond])+" -ne 0 ] "
                    else:
                        if ctext != "":
                            ctext +=  "|| [ $pex" + str(count[cond])+" -ne 0 ] "
                        else:
                            ctext +=  "if [ $pex" + str(count[cond])+" -ne 0 ] "
                if ctext != "":
                    self.text += ctext + " ; then \n\t exit 1\nfi\n"
            if wait is not None:
                self.text += "sleep "+str(wait)+"\n";
            print("Actor ", actor," action ", action, " event ", event, " wait ", wait)
            for exp in self.special:
                print("Looking for ",exp," in ", self.bindings_parsed[action])
                re_exp = r'{}'.format(exp)
                r1 = re.findall(re_exp,self.bindings_parsed[action])
                if len(r1) > 0:
                    for r in r1:
                        print("Match ", r, " r0 ", r[0])
                        searchtext = r
                        candtext = self.special[exp]
                        if not isinstance(r,str):
                            searchtext = r[0]
                            print("Match r1 ", r[1])
                            candtext = candtext.replace("$node", r[1].strip("()"))
                        print("Searchtext ", searchtext)
                        self.text += "tmp=$(ssh " + actor+".$exp.$proj \"echo \`"+candtext+"\`\")\n"
                        self.bindings_parsed[action] = self.bindings_parsed[action].replace(searchtext, "$tmp")
                    
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
        pos_vars = []
        for b in self.bindings_parsed:
            pos_vars.append(self.bindings_parsed[b])
        for s in self.scenario_parsed:
            if s[4] is not None:
                pos_vars.append("wait " + s[4])
        for stmt in pos_vars:
            r1 = re.findall(r"\$\w+", stmt)
            if len(r1) > 0:
                for m in r1:                    
                    vars[nvar] = m.replace("$", "")
                    print("Variable ", vars[nvar])
                    vlong[nvar] = "variable in command " + stmt.replace("$","")
                    nvar += 1
        guidance = "Usage: $0"
        for v in vars:
            guidance += " "+vars[v]
        guidance += "\n"
        for v in vars:
            guidance += "\n\t\t"+vars[v]+" - "+vlong[v]
        guidance += "\n\n";        
        argstring = "if [ \"$#\" -le " + str(nvar-2) + " ]; then\n\tprintf \""+guidance+"\"\n\texit 1\nfi\n\n"
        for v in vars:
            argstring += vars[v] + "=$" + str(v) + "\n"
            
        self.text += argstring
        
            
    def generatePreamble(self):
        self.text += open('bash/bash_preamble.txt', 'r').read()


    def parse(self):
        super().parse()



