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
        print("Created bash")

    def generate(self):
        super().generate()
        print("Bash generate")

        self.generateDew()
        self.generateArgParse()
        self.generatePreamble()
        
        for s in self.scenario_parsed:
            print("Scen ", s)
            
    def generateDew(self):
        self.text += "#!/usr/bin/bash\n"
        self.text += '##################################################################\n#'
        self.text += '# '.join(self.dew.splitlines(True))
        self.text += '##################################################################\n\n'

    def generateArgParse(self):
        vars = { 1: 'project',  2: 'experiment', 3: 'label' }
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
        self.text += argstring
        
            
    def generatePreamble(self):
        self.text += open('bash/bash_preamble.txt', 'r').read()


    def parse(self):
        super().parse()



