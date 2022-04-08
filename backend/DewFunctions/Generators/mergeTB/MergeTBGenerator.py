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
        self.evars = []

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
                    for n in c[1]:
                        actors[n] = 1
                        if n in self.num.keys():
                            for i in range (1, self.num[n]+1):
                                lans[cl].append(n+"-"+str(i))
                        else:
                            lans[cl].append(n)
                    cl += 1
        label = "main"

        if (os.keys()):
            self.run[label] += "from mergexp.machine import image\n"
        experimentName = self.experimentName
        sampleList = experimentName.split()
        experimentName = "-".join(sampleList)
        self.run[label] += "# create a topology named '" + experimentName + "'\n"
        self.run[label] += "net = mx.Topology('" + experimentName + "')\n\n"
        # Generate nodes
        status = 1
        for a in actors:
            if a not in self.num.keys():
                self.run[label] += a +" = net.device('" + a + "')\n"
                if (a in os.keys()):
                    self.run[label] += "net.device("+a+", image == \""+ os[a] + "\"\n"
            else:
                status = 0
        if status == 0:
            self.run[label] += "nodes = [net.device(name) for name in ["
        count = 0
        for a in actors:
            count += 1
            if a in self.num.keys():
                for i in range(1,self.num[a]+1):
                    self.run[label] += " '"+ str(a) + "-" + str(i) + "'"
                    #if i != self.num[a]:
                if count != len(actors):
                    self.run[label] += ","
        if status == 0:
            self.run[label] += "]]\n"

        # Generate links 
        cnt = 1
        for a in links.keys():
            #self.run[label] += "[net.device(name) for name in ["
            if a in self.num.keys():
                for i in range (1, self.num[a]+1):
                    for b in links[a].keys():
                        if b in self.num.keys():
                            for j in range (1,self.num[b]+1):
                                self.run[label] += "link" + str(cnt) + " = " + "net.connect([" + "a" + "-"+str(i)+","+b+"-"+str(j)+"])\n"
                                cnt += 1
                        else:
                            #self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+"-"+str(i)+" "+b+" 100Mb 0ms DropTail]\n"'''
                        #self.run[label] += "'" + a + "'," +"'" + b + "'"
                            self.run[label] += "link" + str(cnt) + " = " + "net.connect([" + "a" + "-"+str(i)+","+b+"])\n"
                        cnt += 1
            else:
                 for b in links[a].keys():
                     if b in self.num.keys():
                         for j in range (1,self.num[b]+1):
                               #self.run[label] += "set link"+str(cnt)+" [$ns duplex\-link "+a+" "+b+"-"+str(j)+" 100Mb 0ms DropTail]\n"
                            self.run[label] += "link" + str(cnt) + " = " + "net.connect([" + "a" +","+b+"-"+str(j)+"])\n"
                            cnt += 1
                     else:
                         #self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+" "+b+" 100Mb 0ms DropTail]\n"'''
                         self.run[label] += "link" + str(cnt) + " = " + "net.connect([" + "a" +","+b+"])\n"
                 #self.run[label] += "'" + a + "'," +"'" + b + "'"
                 cnt += 1
            #self.run[label] += "]]\n"
        # Generate lans
        for l in lans.keys():
            #self.run[label] += "set lan"+str(l)+" [$ns make-lan \""
            self.run[label] += "nodes" + str(l) + " = [net.device(name) for name in ["
            for n in lans[l]:
                #self.run[label] += n+ " "
                self.run[label] += "'" + n + "'"
                if n != lans[l][len(lans[l])-1]:
                    self.run[label] += ", "
                print("hi")
            self.run[label] += "]]\n"
            self.run[label] += "lan" + str(l) + " net.connect(nodes" + str(l) + ")\n"
            
    def generatePreamble(self, label):
        self.run[label] = "import mergexp as mx\n"
        self.run[label] += "from mergexp.net import capacity\n\n"

    def generatePostamble(self, label):
        #self.run[label] += "# specify the net object as the experiment topology created by this script\n"
        self.run[label] += "mx.experiment(net)\n"

    def parse(self):
        super().parse()



