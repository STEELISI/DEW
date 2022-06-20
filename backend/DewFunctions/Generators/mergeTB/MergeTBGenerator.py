# eth=$(ssh b.cmimic.trafgen "echo \`inet eth exp\`"); echo $eth

import os.path
import sys
import re
from functools import reduce

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
            if (c[0] == 'config') and ('num' in c[2]):
                number = c[2][c[2].index('num') + 1]
                for act in c[1]:
                    self.num[act] = int(number)
                continue
            if ((c[0] in ['config', 'link', 'lan'])):
                for act in c[1]:
                    if act not in self.num.keys():
                        self.num[act] = 1
                continue
            
    def generateMergeTB(self):
        
        # Collect all actors
        actors = dict()
        os = dict()
        ip = dict()
        hw = dict()
        links = dict()
        link_lines = []
        lan_lines = []
        
        for s in self.scenario_parsed:
            actors[s[1][0]] = 1

        # Collect OS constraints
        for c in self.constraints_parsed:
            if (c[0] == 'config') and ('os' in c[2]):
                config_os = c[2][c[2].index('os') + 1]
                for act in c[1]:
                    os[act] = config_os

        # Collect IP Address Constraints
        for c in self.constraints_parsed:
            if (c[0] == 'config') and ('location' in c[2]):
                config_ip = c[2][c[2].index('location') + 1]
                for act in c[1]:
                    ip[act] = config_ip

        # Collect Hardware Type Constraints
        for c in self.constraints_parsed:
            if (c[0] == 'config') and ('nodetype' in c[2]):
                config_hw = c[2][c[2].index('nodetype') + 1]
                for act in c[1]:
                    hw[act] = config_hw

        # Collect link constraints
        cl = 0
        lans = dict()
        links = dict()
        bw = dict()
        delay = dict()

        nodeName_in_list = []

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
                    if n in self.num.keys() and self.num[n]!=1:
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


        label = "main"
        print(os.keys())
        if (len(os.keys())>0):
            self.run[label] = self.run[label][:-1] + "from mergexp.machine import image\n\n"
        experimentName = self.experimentName
        sampleList = experimentName.split()
        experimentName = "-".join(sampleList)
        self.run[label] += "# create a topology named '" + experimentName + "'\n"
        self.run[label] += f"net = Network('{experimentName}', addressing==ipv4)\n"

        
        # Generate nodes
        if set(actors) != set(os.keys()):
            self.run[label] += "nodes = [net.node(name) for name in ["
            count = 0
            for a in actors:
                if a in os.keys():
                    continue
                count += 1
                if a in self.num.keys() and self.num[a]!=1:
                    for i in range(1,self.num[a]+1):
                        self.run[label] += " '"+ str(a) + "-" + str(i) + "'"
                        nodeName_in_list.append(str(a) + "-" + str(i))
                        #if i != self.num[a]:
                        self.run[label] += ","
                else:
                    self.run[label] += " '"+ str(a) + "'"
                    nodeName_in_list.append(str(a))
                    self.run[label] += ","
            self.run[label] = self.run[label][:-1] + "]]\n"
        else:
            self.run[label] += "nodes = []\n"
        count = 0
        for a in actors:
            if a not in os.keys():
                continue
            self.run[label] += f"nodes = nodes + [net.node(name, image=={os[a]}) for name in ["
            count += 1
            if a in self.num.keys() and self.num[n]!=1:
                for i in range(1,self.num[a]+1):
                    self.run[label] += " '"+ str(a) + "-" + str(i) + "'"
                    nodeName_in_list.append(str(a) + "-" + str(i))
                    #if i != self.num[a]:
                    self.run[label] += ","
            else:
                self.run[label] += " '"+ str(a) + "'"
                nodeName_in_list.append(str(a))
                self.run[label] += ","
            self.run[label] = self.run[label][:-1] + "]]\n"


        # Generate links 
        cnt = 0
        for a in links.keys():
            if a in self.num.keys():
                for i in range (1, self.num[a]+1):
                    for b in links[a].keys():
                        current_bw = '100'
                        current_delay = '0'
                        if(set([a,b]) in [set(x.split(' ')) for x in bw.keys()]):
                            current_bw = bw[a + ' ' + b] if ((a + ' ' + b) in bw) else bw[b + ' ' + a]
                            current_bw = str(current_bw) 
                        if(set([a,b]) in [set(x.split(' ')) for x in delay.keys()]):
                            current_delay = delay[a + ' ' + b] if ((a + ' ' + b) in delay) else delay[b + ' ' + a] 
                            current_delay = str(current_delay) 
                        if b in self.num.keys():
                            for j in range (1,self.num[b]+1):
                                pointer_a = ""
                                pointer_b = ""
                                if self.num[a]!=1:
                                    pointer_a = f"-{str(i)}"
                                if self.num[b]!=1:
                                    pointer_b = f"-{str(j)}"
                                line = f"link{str(cnt)} = net.connect([nodes[{nodeName_in_list.index(f'{a}{pointer_a}')}], nodes[{nodeName_in_list.index(f'{b}{pointer_b}')}]], capacity==gbps({current_bw}), latency==ms({current_delay}))\n"
                                self.run[label] += line
                                link_lines.append(line)
                                cnt += 1
                        else:
                            pointer_a = ""
                            pointer_b = ""
                            if self.num[a]!=1:
                                pointer_a = f"-{str(i)}"
                            line = f"link{str(cnt)} = net.connect([nodes[{nodeName_in_list.index(f'{a}{pointer_a}')}], nodes[{nodeName_in_list.index(f'{b}')}]], capacity==gbps({current_bw}), latency==ms({current_delay}))\n"
                            self.run[label] += line
                            link_lines.append(line)
                            cnt += 1
            else:
                 for b in links[a].keys():
                    current_bw = '100'
                    current_delay = '0'
                    if(set(a,b) == set(x.split(' ')) for x in bw.keys()):
                        current_bw = bw[a + ' ' + b] if ((a + ' ' + b) in bw) else bw[b + ' ' + a]
                        current_bw = str(current_bw)  
                    if(set(a,b) == set(x.split(' ')) for x in delay.keys()):
                        current_delay = delay[a + ' ' + b] if ((a + ' ' + b) in delay) else delay[b + ' ' + a]
                        current_delay = str(current_delay)
                    if b in self.num.keys():
                        for j in range (1,self.num[b]+1):
                            pointer_a = ""
                            pointer_b = ""
                            if self.num[b]!=1:
                                pointer_b = f"-{str(j)}"
                            line = f"link{str(cnt)} = net.connect([nodes[{nodeName_in_list.index(f'{a}')}], nodes[{nodeName_in_list.index(f'{b}{pointer_b}')}]], capacity==gbps({current_bw}), latency==ms({current_delay}))\n"
                            self.run[label] += line
                            link_lines.append(line)
                            cnt += 1
                    else:
                        pointer_a = ""
                        pointer_b = ""
                        line = f"link{str(cnt)} = net.connect([nodes[{nodeName_in_list.index(f'{a}{pointer_a}')}], nodes[{nodeName_in_list.index(f'{b}{pointer_b}')}]], capacity==gbps({current_bw}), latency==ms({current_delay}))\n"
                        self.run[label] += line
                        link_lines.append(line)
                        cnt += 1

        # Generate lans
        for l in lans.keys():
            line = "lan" + str(l) + " = net.connect(["
            bw_index = None
            if len(bw.keys()) > 0:
                reduce(lambda x,y: x if x != None else y, [x if (set(x.split(' ')) == set([y.split('-')[0] for y in lans[l]])) else None for x in bw.keys()])
            delay_index = None
            if len(delay.keys()) > 0:
                reduce(lambda x,y: x if x != None else y, [x if (set(x.split(' ')) == set([y.split('-')[0] for y in lans[l]])) else None for x in delay.keys()])
            current_bw = '100' if bw_index == None else str(bw[bw_index])
            current_delay = '0' if delay_index == None else str(delay[delay_index])
            for n in lans[l]:
                single = re.findall('-[0-9]+$', n)
                if single == []:
                    line += f"nodes[{nodeName_in_list.index(f'{n}')}], "
                else:
                    node_name = f"{'-'.join(n.split('-')[:-1])}-{single[0][1:]}"
                    line += f'nodes[{nodeName_in_list.index(f"{node_name}")}], '
            line = line[:-2] + f"], capacity==gbps({current_bw}), latency==ms({current_delay}))\n"
            self.run[label] += line
            lan_lines.append(line)

        self.run[label] += '\n\n'



        # Generate IP Addresses

        for act in ip.keys():
            actor = []
            if act in self.num.keys() and self.num[act]!=1:
                for i in range(int(self.num[act])):
                    actor.append(f"{act}-{i+1}")
            else:
                actor.append(act)

            for item in actor:
                line = ""
                link_item = []
                lan_item = []
                for link_line in link_lines:
                    if f"nodes[{nodeName_in_list.index(f'{item}')}]" in link_line:
                        link_item.append(re.findall('(link[0-9]+) = ', link_line)[0])
                for l_item in link_item:
                    node_idx = nodeName_in_list.index(f'{item}')
                    line += f"{l_item}[{f'nodes[{node_idx}]'}].socket.addrs = ip4('{ip[act]}')\n" 
                for lan_line in lan_lines:
                    if f"nodes[{nodeName_in_list.index(f'{item}')}]" in lan_line:
                        lan_item.append(re.findall('(lan[0-9]+) = ', lan_line)[0])
                for l_item in lan_item:
                    node_idx = nodeName_in_list.index(f'{item}')
                    line += f"{l_item}[{f'nodes[{node_idx}]'}].socket.addrs = ip4('{ip[act]}')\n"
                self.run[label] += line        
                
        self.run[label] += '\n\n'

            
    def generatePreamble(self, label):
        self.run[label] = "from mergexp import *\n"

    def generatePostamble(self, label):
        #self.run[label] += "# specify the net object as the experiment topology created by this script\n"
        self.run[label] += "experiment(net)\n"

    def parse(self):
        super().parse()



