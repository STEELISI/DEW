# eth=$(ssh b.cmimic.trafgen "echo \`inet eth exp\`"); echo $eth

import os.path
import sys
import re

cwd = os.path.dirname(os.path.realpath(__file__))
parentDir = os.path.abspath(os.path.join(cwd, os.pardir))
sys.path.insert(0, parentDir)
from generator import Generator

class NSGenerator(Generator):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, name="ns", **kwargs)
        self.evars = [];

    def generate(self):
        super().generate()

        self.collectNum()
        self.generatePreamble("main")        
        self.generateNS()
        self.generatePostamble("main")        

    def collectNum(self):
        self.num = dict()
        for c in self.constraints_parsed:
            if c[0] == 'num':
                self.num[c[1][0]] = int(c[2][0])
            
    def generateNS(self):
        
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
        lan_feat = dict()
        for c in self.constraints_parsed:
            r1 = re.findall("link", c[0])
            if len(r1) > 0:
                a = c[1][0]
                b = c[1][1]
                optional_features = dict()
                for i in range(3,len(c)):
                    if c[i] != None:
                        if c[i][0] != "ip":
                            optional_features[c[i][0]] = c[i][1]
                        else:
                            optional_features[c[i][0]] = [c[i][1], c[i][2]]
                    
                actors[a] = 1
                actors[b] = 1
                if a not in links.keys() and b not in links.keys():
                    links[a] = dict()
                    links[a][b] = optional_features
                    
                elif a in links.keys():
                    links[a][b] = optional_features
                else:
                    links[b][a] = optional_features
            else:
                r1 = re.findall("lan", c[0])
                if len(r1) > 0:
                    a = c[1][0]
                    b = c[1][1]
                    optional_features = dict()
                    for i in range(3,len(c)):
                        if c[i] != None:
                            if c[i][0] != "ip":
                                optional_features[c[i][0]] = c[i][1]
                            else:
                                optional_features[c[i][0]] = [c[i][1], c[i][2]]

                    if a not in lan_feat.keys() and b not in lan_feat.keys():
                        lan_feat[a] = dict()
                        lan_feat[a][b] = optional_features
                    elif a in lan_feat.keys():
                        lan_feat[a][b] = optional_features
                    else:
                        lan_feat[b][a] = optional_features

                    lans[cl] = dict()
                    for n in c[1]:
                        actors[n] = 1
                        if n in self.num.keys():
                            for i in range (1, self.num[n]+1):
                                lans[cl][n+"-"+str(i)] = optional_features
                        else:
                            lans[cl][n] = optional_features
                    cl += 1
                    
        # Generate nodes
        label="main"
        for a in actors:
            if a in self.num.keys():
                self.run[label] +=  "set NODES " + str(self.num[a]) + "\n"
                self.run[label] += "for {set i 1} {$i <= $NODES} {incr i} {\n"
                self.run[label] += "\t set "+a+"($i) [$ns node]\n"
                if (a in os.keys()):
                    self.run[label] += "\t tb-set-node-os [set "+a+"($i)] " + os[a] + "\n"
                else:
                    self.run[label] += "\t tb-set-node-os [set "+a+"($i)] Ubuntu-DEW\n"
                self.run[label] += "}\n"
            else:
                self.run[label] += "set "+a+" [$ns node]\n"
                if (a in os.keys()):
                    self.run[label] += "tb-set-node-os "+a+" "+ os[a] + "\n"
                else:
                    self.run[label] += "tb-set-node-os "+a+" Ubuntu-DEW\n"


        # Generate links 
        cnt = 1
        for a in links.keys():
            if a in self.num.keys():
                for i in range (1, self.num[a]+1):
                    for b in links[a].keys():
                        if b in self.num.keys():
                            for j in range (1,self.num[b]+1):
                                self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+"-"+str(i)+" "+b+"-"+str(j)+" 100Mb 0ms DropTail]\n"
                                if "bw" in links[a][b] and "delay" in links[a][b] and "loss" in links[a][b]:
                                    self.run[label] += "tb-set-link-simplex-params " + "$link"+ str(cnt) + " " + a + "-" + str(i) + " " + links[a][b]["delay"] + " " + links[a][b]["bw"] + " " + links[a][b]["loss"] + "\n"
                                    self.run[label] += "tb-set-link-simplex-params " + "$link"+ str(cnt) + " " + b + "-" + str(j) + " " + links[a][b]["delay"] + " " + links[a][b]["bw"] + " " + links[a][b]["loss"] + "\n"
                                else:
                                    if "loss" in links[a][b]:
                                        self.run[label] += "tb-set-link-loss " + "$link"+ str(cnt) + " " + links[a][b]["loss"] + "\n"
                                cnt += 1
                        else:
                            self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+"-"+str(i)+" "+b+" 100Mb 0ms DropTail]\n"
                            if "bw" in links[a][b] and "delay" in links[a][b] and "loss" in links[a][b]:
                                self.run[label] += "tb-set-link-simplex-params " + "$link"+ str(cnt) + " " + a + "-" + str(i) + " " + links[a][b]["delay"] + " " + links[a][b]["bw"] + " " + links[a][b]["loss"] + "\n"
                                self.run[label] += "tb-set-link-simplex-params " + "$link"+ str(cnt) + " " + b + " " + links[a][b]["delay"] + " " + links[a][b]["bw"] + " " + links[a][b]["loss"] + "\n"
                            else:
                                if "loss" in links[a][b]:
                                    self.run[label] += "tb-set-link-loss " + "$link"+ str(cnt) + " " + links[a][b]["loss"] + "\n"
                            cnt += 1
            else:
                 for b in links[a].keys():
                     if b in self.num.keys():
                         for j in range (1,self.num[b]+1):
                               self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+" "+b+"-"+str(j)+" 100Mb 0ms DropTail]\n"
                               if "bw" in links[a][b] and "delay" in links[a][b] and "loss" in links[a][b]:
                                   self.run[label] += "tb-set-link-simplex-params " + "$link"+ str(cnt) + " " + a + " " + links[a][b]["delay"] + " " + links[a][b]["bw"] + " " + links[a][b]["loss"] + "\n"
                                   self.run[label] += "tb-set-link-simplex-params " + "$link"+ str(cnt) + " " + b + "-" + str(j) + " " + links[a][b]["delay"] + " " + links[a][b]["bw"] + " " + links[a][b]["loss"] + "\n"
                               else:
                                   if "loss" in links[a][b]:
                                       self.run[label] += "tb-set-link-loss " + "$link"+ str(cnt) + " " + links[a][b]["loss"] + "\n"
                               cnt += 1
                     else:
                         self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+" "+b+" 100Mb 0ms DropTail]\n"
                         if "bw" in links[a][b] and "delay" in links[a][b] and "loss" in links[a][b]:
                            self.run[label] += "tb-set-link-simplex-params " + "$link"+ str(cnt) + " " + a + " " + links[a][b]["delay"] + " " + links[a][b]["bw"] + " " + links[a][b]["loss"] + "\n"
                            self.run[label] += "tb-set-link-simplex-params " + "$link"+ str(cnt) + " " + b + " " + links[a][b]["delay"] + " " + links[a][b]["bw"] + " " + links[a][b]["loss"] + "\n"
                         else:
                            if "loss" in links[a][b]:
                                 self.run[label] += "tb-set-link-loss " + "$link"+ str(cnt) + " " + links[a][b]["loss"] + "\n"

                         if "ip" in links[a][b]:
                             self.run[label] += "tb-set-ip-link " + "$" + a + " $link" + str(cnt) + " " + links[a][b]["ip"][0] + "\n"
                             self.run[label] += "tb-set-ip-link " + "$" + b + " $link" + str(cnt) + " " + links[a][b]["ip"][1] + "\n"
                         cnt += 1
        # Generate lans
        for l in lans.keys():
            self.run[label] += "set lan"+str(l)+" [$ns make-lan \""
            sample_key = ""
            for n in lans[l].keys():
                self.run[label] += n+ " "
                sample_key = n
            self.run[label] += "\" 100Mb 0.0ms]\n"

            for n in lans[l].keys():
                if "bw" in lans[l][n]:
                    self.run[label] += "tb-set-node-lan-bandwidth " + n + " lan" + str(l) + " " + lans[l][n]["bw"] + "Mb\n"

                if "delay" in lans[l][n]:
                    self.run[label] += "tb-set-node-lan-delay " + n + " lan" + str(l) + " " + lans[l][n]["delay"] + "ms\n"

            if "loss" in lans[l][sample_key]:
                self.run[label] += "tb-set-lan-loss " + "$lan"+ str(l) + " " + lans[l][sample_key]["loss"] + "\n"
            
            
    def generatePreamble(self, label):
        self.run[label] = '# generated by DEW 1.0\nset ns [new Simulator]\nsource tb_compat.tcl\n\n'

    def generatePostamble(self, label):
        self.run[label] += '\n$ns rtproto Static\n$ns run\n\n'

    def parse(self):
        super().parse()



