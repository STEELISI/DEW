# eth=$(ssh b.cmimic.trafgen "echo \`inet eth exp\`"); echo $eth

import os.path
import sys
import re

cwd = os.path.dirname(os.path.realpath(__file__))
parentDir = os.path.abspath(os.path.join(cwd, os.pardir))
sys.path.insert(0, parentDir)
from generator import Generator

class MergeTBGenerator(Generator):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, name="ns", **kwargs)
        self.evars = [];

    def generate(self):
        super().generate()

        self.collectNum()
        self.generatePreamble()        
        self.generateNS()
        self.generatePostamble()        

    def collectNum(self):
        self.num = dict()
        for c in self.constraints_parsed:
            if c[0] == 'num':
                self.num[c[1][0]] = int(c[2][0])
            
    def generateMergeTB(self):
        # Collect all actors
        actors = dict()
        for s in self.scenario_parsed:
            actors[s[1][0]] = 1

        # Collect link constraints
        cl = 0
        for c in self.constraints_parsed:
            r1 = re.findall("link", c[0])
            if len(r1) > 0:
                a = c[1][0]
                b = c[1][1]
                actors[a] = 1
                actors[b] = 1
                if a not in links.keys() and b not in links.keys():
                    links[a] = dict()
                    links[a][b] = 1
                elif a in links.keys():
                    links[a][b] = 1
                else:
                    links[b][a] = 1
            else:
                r1 = re.findall("lan", c[0])
                if len(r1) > 0:
                    lans[cl] = []
                    for n in c[1]:
                        actors[n] = 1
                        if n in self.num.keys():
                            for i in range (1, self.num[n]+1):
                                lans[cl].append(n+"-"+str(i))
                        else:
                            lans[cl].append(n)
                    cl += 1
                    
        # Generate links 
        cnt = 1
            
    def generatePreamble(self):
        self.run += 'import mergexp as mx\nfrom mergexp.net import capacity\n'

    def generatePostamble(self):
        self.run += '\n# specify the net object as the experiment topology created by this script\nmx.experiment(net)\n'

    def parse(self):
        super().parse()
