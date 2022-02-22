# eth=$(ssh b.cmimic.trafgen "echo \`inet eth exp\`"); echo $eth

from os import link
import os.path
import sys
from functools import reduce

cwd = os.path.dirname(os.path.realpath(__file__))
parentDir = os.path.abspath(os.path.join(cwd, os.pardir))
sys.path.insert(0, parentDir)
from generator import Generator

class NSGenerator(Generator):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, name="ns", **kwargs)
        self.evars = []

    def generate(self, mode=None):
        super().generate(mode)

        self.collectNum()
        self.generatePreamble("main")        
        self.generateNS()
        self.generatePostamble("main")        

    def collectNum(self):
        self.num = dict()
        for c in self.constraints_parsed:
            if (c[0] == 'config') and ('num' in c[2]):
                number = c[2][c[2].index('num') + 1]
                for act in c[1]:
                    self.num[act] = int(number)
            
    def generateNS(self):
        
        # Collect all actors
        actors = dict()
        os = dict()
        links = dict()

        for s in self.scenario_parsed:
            actors[s[1][0]] = 1

        # Collect OS constraints
        for c in self.constraints_parsed:
            if (c[0] == 'config') and ('os' in c[2]):
                config_os = c[2][c[2].index('os') + 1]
                for act in c[1]:
                    os[act] = config_os

        # Collect link constraints
        cl = 0
        lans = dict()
        links = dict()
        bw = dict()
        delay = dict()
        for c in self.constraints_parsed:
            if 'link' in c[0]:
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
            elif 'lan' in c[0]:
                lans[cl] = []
                for n in c[1]:
                    actors[n] = 1
                    if n in self.num.keys():
                        for i in range (1, self.num[n]+1):
                            lans[cl].append(n+"-"+str(i))
                    else:
                        lans[cl].append(n)
                cl += 1
            if c[0] in ['link','lan']:
                if c[2]!=None:
                    if 'bw' in c[2]:
                        link_bw = c[2][c[2].index('bw')+1]
                        bw[' '.join(c[1])] = link_bw
                    if 'delay' in c[2]:
                        link_delay = c[2][c[2].index('delay')+1]
                        delay[' '.join(c[1])] = link_delay
                    
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
                        current_bw = '100Mb'
                        current_delay = '0ms'
                        if(set(a,b) == set(x.split(' ')) for x in bw.keys()):
                            current_bw = bw[a + ' ' + b] if ((a + ' ' + b) in bw) else bw[b + ' ' + a]
                            current_bw = str(current_bw) + 'Mb' 
                        if(set(a,b) == set(x.split(' ')) for x in delay.keys()):
                            current_delay = delay[a + ' ' + b] if ((a + ' ' + b) in delay) else delay[b + ' ' + a] 
                            current_delay = str(current_delay) + 'ms' 
                        if b in self.num.keys():
                            for j in range (1,self.num[b]+1):
                                self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+"-"+str(i)+" "+b+"-"+str(j)+" " + str(current_bw) + " " + str(current_delay) + " DropTail]\n"
                                cnt += 1
                        else:
                            self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+"-"+str(i)+" "+b+" " + str(current_bw) + " " + str(current_delay) + " DropTail]\n"
                            cnt += 1
            else:
                 for b in links[a].keys():
                    current_bw = '100Mb'
                    current_delay = '0ms'
                    if(set(a,b) == set(x.split(' ')) for x in bw.keys()):
                        current_bw = bw[a + ' ' + b] if ((a + ' ' + b) in bw) else bw[b + ' ' + a]
                        current_bw = str(current_bw) + 'Mb'  
                    if(set(a,b) == set(x.split(' ')) for x in delay.keys()):
                        current_delay = delay[a + ' ' + b] if ((a + ' ' + b) in delay) else delay[b + ' ' + a]
                        current_delay = str(current_delay) + 'ms' 
                    if b in self.num.keys():
                        for j in range (1,self.num[b]+1):
                            self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+" "+b+"-"+str(j)+" " + str(current_bw) + " " + str(current_delay) + " DropTail]\n"
                            cnt += 1
                    else:
                        self.run[label] += "set link"+str(cnt)+" [$ns duplex-link "+a+" "+b+" 100Mb 0ms DropTail]\n"
                        cnt += 1
        # Generate lans
        for l in lans.keys():
            self.run[label] += "set lan"+str(l)+" [$ns make-lan \""
            bw_index = reduce(lambda x,y: x if x != None else y, [x if (set(x.split(' ')) == set([y.split('-')[0] for y in lans[l]])) else None for x in bw.keys()])
            delay_index = reduce(lambda x,y: x if x != None else y, [x if (set(x.split(' ')) == set([y.split('-')[0] for y in lans[l]])) else None for x in delay.keys()])
            current_bw = '100Mb' if bw_index == None else str(bw[bw_index]) + 'Mb'
            current_delay = '0ms' if delay_index == None else str(delay[delay_index]) + 'ms'
            for n in lans[l]:
                self.run[label] += n+ " "
            self.run[label] += "\" " + str(current_bw) + " " + str(current_delay) + "]\n"
            
    def generatePreamble(self, label):
        self.run[label] = '# generated by DEW 1.0\nset ns [new Simulator]\nsource tb_compat.tcl\n\n'

    def generatePostamble(self, label):
        self.run[label] += '\n$ns rtproto Static\n$ns run\n\n'

    def parse(self, mode=None):
        super().parse(mode)



