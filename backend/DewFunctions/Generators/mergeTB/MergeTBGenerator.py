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
        super().__init__(*args, name="mergeTB", **kwargs)
        self.evars = [];

    def generate(self):
        super().generate()

        self.collectNum()
        self.generatePreamble("main")        
        self.generateMergeTB()
        self.generatePostamble("main")        

    def collectNum(self):
        self.num = dict()
        for c in self.constraints_parsed:
            if c[0] == 'num':
                self.num[c[1][0]] = int(c[2][0])
            
    def generateMergeTB(self):
        
        # Collect all actors
        actors = dict()
        os = dict()
        links = dict()
        for s in self.scenario_parsed:
            actors[s[1][0]] = 1

        # Collect OS constraints
        for c in self.constraints_parsed:
            if c[0] == 'os':
                os[c[1][0]] = c[2][0]

        # Collect link constraints
        cl = 0
        lans = dict()
        lansMergeTB = dict()
        links = dict()
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
                    lansMergeTB[cl] = []
                    for n in c[1]:
                        actors[n] = 1
                        if n in self.num.keys():
                            for i in range (1, self.num[n]+1):
                                lans[cl].append(n+"-"+str(i))
                                if n not in lansMergeTB[cl]:
                                    lansMergeTB[cl].append(n)
                        else:
                            lans[cl].append(n)
                            lansMergeTB[cl].append(n)
                    cl += 1
        label = "main"

        experimentName = self.experimentName
        sampleList = experimentName.split()
        experimentName = "-".join(sampleList)
        self.run[label] += "# create a topology named '" + experimentName + "'\n"
        self.run[label] += "net = Network('" + experimentName + "')\n\n"
        self.run[label] += "def px(name):\n"
        self.run[label] += "\treturn net.node(name)\n\n"

        # Generate nodes
        nodesList = []

        for a in actors:
            nodesList.append(a)
            if a in self.num.keys():
                self.run[label] += a + " = [px('" + a + "%d'%i) for i in range(" + str(self.num[a]) + ")]\n"
            else:
                self.run[label] += a + " = [px('" + a + "%d'%i) for i in range(1)]\n"

        # Generate links 
        cnt = 0
        for a in links.keys():
            if a in self.num.keys():
                for b in links[a].keys():
                    if b in self.num.keys():
                        self.run[label] += "link" + str(cnt) + " = [net.connect(["+a+"[i],"+b+"[j]]) for i in range(" + str(self.num[a])  + ") for j in range("+ str(self.num[b])  +")]\n"
                        cnt += 1
                        break
                    else:
                        self.run[label] += "link" + str(cnt) + " = [net.connect(["+a+"[i],"+b+"[j]]) for i in range(" + str(self.num[a])  + ") for j in range(1)]\n"
                        cnt += 1
                        break
            else:
                 for b in links[a].keys():
                    if b in self.num.keys():
                        self.run[label] += "link" + str(cnt) + " = [net.connect(["+a+"[i],"+b+"[j]]) for i in range(1) for j in range("+ str(self.num[b])  +")]\n"
                        cnt += 1
                        break
                    else:
                        self.run[label] += "link" + str(cnt) + " = [net.connect(["+a+"[i],"+b+"[j]]) for i in range(1) for j in range(1)]\n"
                        cnt += 1
                        break
                
        # Generate lans
        for l in lansMergeTB.keys():
            self.run[label] += "lan" + str(l) + " = net.connect("
            for i in range(len(lansMergeTB[l])):
                if i != len(lansMergeTB[l]) - 1:
                    self.run[label] += lansMergeTB[l][i]+" + "
                else:
                    self.run[label] += lansMergeTB[l][i]
            self.run[label] +=  ")\n"

    def generatePreamble(self, label):
        self.run[label] = "from mergexp import *\n"

    def generatePostamble(self, label):
        self.run[label] += "experiment(net)\n"

    def parse(self):
        super().parse()



