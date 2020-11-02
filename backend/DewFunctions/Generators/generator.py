# XXX We need to redo the directory structure so core functions (like Scenario parsing) are more central.
# In the meantime:
import os.path
import sys
# cwd = os.path.dirname(os.path.realpath(__file__))
# parentDir = os.path.abspath(os.path.join(cwd, os.pardir))
# # print(parentDir + '/UI/HighLevelBehaviorLanguage/')
# sys.path.insert(0, parentDir + '/UI/HighLevelBehaviorLanguage/')
# sys.path.insert(0, parentDir + '/UI/')

sys.path.append('../UI/HighLevelBehaviorLanguage/')
sys.path.append('../UI/')

import globals
import ast
import re

from hlb_parser import HLBParser, ConstraintParser, BindingParser


class GeneralGenerator(object):
    # scenario and constraints given as a list.
    def __init__(self, scenario, constraints=None, bindings=None, name='Generic Class'):
        # For debugging. Subclass should set this to something meaningful. e.g. "bash"
        self.name = name

        # A list of DEW constraints. E.g. ['num actorA 3', 'os actorB ubuntu']
        self.constraints = constraints

        # A list of Scenario statements. E.g. ['Scenario statement 1', 'Scenario statement 2']
        # The order of the list is not meaningful.
        self.scenario = scenario

        # A list of bindings statements. E.g. ['Bindings statement 1', 'Bindings statement 2']
        self.bindings = bindings

        # Imported from hlb_parser.
        self.HLBparser = HLBParser(globals.actors)
        self.ConstParser = ConstraintParser()
        self.BindParser = BindingParser()

        # After we parse statements, we store them as a list of tuples (one tuple per statement).
        self.scenario_parsed = []
        self.constraints_parsed = []
        self.bindings_parsed = {}


    def parse(self):
        # For each item in our scenario/constraints lists, make sure we can parse it and
        # turn it into tuplets.
        # Scenario -> ['trigger events', 'actors', 'action', 'emit events', 'wait time']
        # (note, some of these can be None)

        # Constraints -> ['constraint type', 'target', 'value' ] (some of these can be None)
        for c in self.constraints:
            try:
                parsedTuple = self.ConstParser.parse_stmt(c)
            except:
                print("ERROR:\tCannot parse the following constraint: %s\n" % c)
                return False
            # Because we use parsing for UI suggestions, we don't throw exceptions
            # when we can't parse a statement, instead the parser returns a tuplet of Nones.
            if all(x == None for x in parsedTuple):
                print("ERROR:\tUnparsable constraint: %s\n" % c)
                #return False

            # XXX Right now, for generation we only care about 'num' constraints.
            # XXX At some point we may care about others, like 'os'.
            #if 'num' == parsedTuple[0]:
            self.constraints_parsed.append(parsedTuple)

        for s in self.scenario:
            try:
                parsedTuple = self.HLBparser.parse_stmt(s)
            except:
                print("ERROR:\tCannot parse the following Scenario statement: %s\n" % s)
                return False
            # See above comment - we return all Nones if statement is un-parsable.
            if all(x == None for x in parsedTuple):
                print("ERROR:\tUnparsable Scenario statement: %s\n" % s)
                #return False
            self.scenario_parsed.append(parsedTuple)

    # def graphDependency(self):
    #     # We only need dependencies for Scenario.
    #     pass

    def generate(self):
        # Parse all our Scenario and Constraints.
        self.parse()
        print(self.scenario_parsed)
        print(self.constraints_parsed)
        return self.scenario_parsed, self.constraints_parsed

    #     # Figure out dependencies
    #     # XXX For now, this is its own code here, BUT we should not duplicate functionality
    #     # XXX between the generator and the UI that shows the dependency graph.
    #     if not self.graphDependency():
    #         exit()


    # def translate(self):
    #     # THIS FUNCTION SHOULD BE OVERRIDDEN BY SPECIFIC GENERATOR.
    #     # XXX We may find that we need more info than this group by group approach:
    #     # XXX but for now, we tranlate a set of Scenario commands at a time which can be
    #     # started at the same time.
    #     # Any constraints that apply to the targets (Scenario actors) in the commands
    #     # are also packaged with the Scenario command set.
    #     pass


    # def outputNS(self, filename="nsFile.txt"):
    #    #This function writes the generated NS commands to nsFile.txt.
    #    global nsCommands
    #    opt = "set ns [new Simulator]\n"
    #    opt += "source tb_compat.tcl\n"
    #    opt += nsCommands
    #    opt += "$ns rtproto Static\n"
    #    opt += "$ns run\n"
    #    with open(filename, 'w') as f:
    #        f.write(opt)

    def generateNS(self, constraintList, scenarios=None, actors=None):
        #This function generates the corresponding NS commands based on the constraint List.
        #Currently, we are handling node, link, lan and os list.
        #Any new constraint list must be handled here.
        nsCommands = ""
        nodeList = []
        linkList = []
        lanList = []
        locationList = []
        osList = []
        nodesInOsList = set([])
        osSupported = ['ubuntu','fedora','freebsd','fbsd','centos','kali','metasploitable','linux','windows','winxp']
        defaultOS = "Ubuntu-EDU"
        nodes = []
        parser = HLBParser([])
        if actors is None:
            actors = []
        if scenarios is not None:
            for scenario in scenarios:
                _t,v,_h = parser.extract_partial(scenario)
                print(v)
                nodes.append(v)
            for a in nodes:
                if a['actors'] is not None:
                    for b in a['actors']:
                        if b not in actors:
                            actors.append(b)
        for i in constraintList:
            for x in i:
                if x is None:
                    break
                if x == "num":
                    nodeList.append(i)
                    #print(nodeList)
                    break
                elif x == "os":
                    osList.append(i)
                    #print(osList)
                    break
                elif "lan" in x:
                    lanList.append(i)
                    #print(lanList)
                    break
                elif x == "location":
                    locationList.append(i)
                    #print(locationList)
                    break
                elif "link" in x:
                    linkList.append(i)
                    break
        clientServerList = {}
        if len(nodeList):
            for x in nodeList:
                count = 0
                for y in x:
                    if y == "num" or y == None:
                        continue
                    for k in y:
                        if not k.isnumeric():
                            temp = k
                        else:
                            count = k
                clientServerList[str(temp)] = int(count)
                if int(count) == 0:
                    print("ERROR:\t Invalid statement, Cannot be converted to NS command:", x)
                    continue;
                if clientServerList[str(temp)] == 1:
                    sampleString = "set " + str(temp) + " [$ns node]\n"
                else:
                    sampleString = "for { set i 0} {$i < "
                    sampleString += count
                    sampleString += "} {incr i} {\n"
                    sampleString += "\tset "
                    sampleString += str(temp)
                    sampleString += "$i [$ns node]\n"
                    sampleString += "}\n"
                nsCommands += sampleString

        if actors is not None:
            tmp = 1
            for x in actors:
                if str(x) not in clientServerList:
                    clientServerList[str(x)] = 1
                    sampleString = "set "
                    sampleString += str(x)
                    sampleString += " [$ns node]\n"
                    nsCommands += sampleString

        if len(linkList):
           counter = 0
           sampleList = []
           for x in linkList:
                c = 0
                allLink = 0
                anyLink = 0
                sampleList.clear()
                for y in x:
                    if y is not None:
                        if "link" in y:
                            if "all" in y:
                                allLink = 1
                            elif "any" in y:
                                anyLink = 1
                            continue
                    if y == None:
                        continue
                    for k in y:
                        c+=1
                        sampleList.append(k)
                if c != 2:
                    print("ERROR:\t Invalid statement, Cannot be converted to NS command:", x)
                    continue;
                minimum = 0xffffffff;
                for k in sampleList:
                    if str(k) in clientServerList:
                        if int(clientServerList[str(k)]) < minimum:
                            if allLink == 1:
                                minimum = clientServerList[k]
                            elif anyLink == 1:
                                minimum = 1
                    else:
                        #print("ERROR:\t Node is not defined, Cannot be converted to NS command:", x)
                        #print("ALERT:\t Node is not defined, Creating a node:", str(k))
                        minimum = 1
                        clientServerList[str(k)] = minimum
                        clientServerList[str(x)] = 1
                        sampleString = "set " + str(k) + " [$ns node]\n"
                        nsCommands += sampleString
                if int(clientServerList[str(sampleList[0])]) != 1 and int(clientServerList[str(sampleList[1])]) != 1:
                    if allLink == 0 and anyLink == 0:
                        print("ERROR:\t ALL or ANY keyword must be specified for node more than 1, Node:",str(sampleList[0]),",",str(sampleList[1]))
                        minimum = 1
                else:
                    minimum = 1
                if minimum == 1:
                    counter+=1
                    nsCommands += "set link"+ str(counter) +" "
                    nsCommands += "[$ns duplex-link "
                    if clientServerList[str(sampleList[0])] == 1:
                        nsCommands += "$"+ str(sampleList[0]) +" "
                    else:
                        nsCommands += "$"+ str(sampleList[0]) +"0" + " "

                    if clientServerList[str(sampleList[1])] == 1:
                        nsCommands += "$"+ str(sampleList[1]) +" "
                    else:
                        nsCommands += "$"+ str(sampleList[1]) +"0" + " "
                    nsCommands += "1Gb 0ms DropTail]\n"
                else:
                    for j in range(0,minimum):
                        counter+=1
                        nsCommands += "set link"+ str(counter) +" "
                        nsCommands += "[$ns duplex-link "
                        nsCommands += "$"+ str(sampleList[0]) + str(j) +" "
                        nsCommands += "$"+ str(sampleList[1]) + str(j) +" "
                        nsCommands += "1Gb 0ms DropTail]\n"

        if len(osList):
           for x in osList:
                node = ""
                os = ""
                counter = 0
                for y in x:
                    if y == "os" or y == None:
                        continue
                    for k in y:
                        if counter == 0:
                            if k in clientServerList:
                                node = k
                            else:
                                #print("ERROR:\t Node is not defined, Cannot be converted to NS command:", x)
                                #print("ALERT:\t Node is not defined, Creating a node:", node)
                                node = k
                                clientServerList[str(node)] = 1
                                sampleString = "set " + str(k) + " [$ns node]\n"
                                nsCommands += sampleString
                            if k not in nodesInOsList:
                                nodesInOsList.add(k)
                        elif counter == 1:
                            res = [i for i in osSupported if re.search(k, i, re.IGNORECASE)]
                            if res:
                                os = k
                            else:
                                print("ALERT:\t Invalid Operating System, Assigning the default OS Ubuntu-EDU")
                                os = "Ubuntu-EDU"
                    counter+=1

                if node != "":
                    if clientServerList[str(node)] == 1:
                        nsCommands += "tb-set-node-os"
                        nsCommands += " " + "$" + str(node)
                        nsCommands += " " + str(os)
                        nsCommands += "\n"
                    else:
                        for j in range(0,clientServerList[str(node)]):
                            nsCommands += "tb-set-node-os"
                            nsCommands += " " + "$" + str(node) + str(j)
                            nsCommands += " " + str(os)
                            nsCommands += "\n"

        if len(lanList):
           counter = 0
           sampleLanList = []
           for x in lanList:
                c = 0
                allLan = 0
                anyLan = 0
                sampleLanList.clear()
                for y in x:
                    if y is not None:
                        if "lan" in y:
                            if "all" in y:
                                allLan = 1
                            elif "any" in y:
                                anyLan = 1
                            continue
                    if y == None:
                        continue
                    for k in y:
                        c+=1
                        sampleLanList.append(k)
                if c != 2:
                    print("ERROR:\t Invalid statement, Cannot be converted to NS command:", x)
                    continue;
                minimum = 0xffffffff;
                for k in sampleLanList:
                    if str(k) in clientServerList:
                        if int(clientServerList[str(k)]) < minimum:
                            if allLan == 1:
                                minimum = int(clientServerList[str(k)])
                            elif anyLan == 1:
                                minimum = 1
                    else:
                        #print("ERROR:\t Node is not defined, Cannot be converted to NS command:", x)
                        #print("ALERT:\t Node is not defined, Creating a node:", str(k))
                        minimum = 1
                        clientServerList[str(k)] = minimum
                        nsCommands += "set " + str(k) + " [$ns node]\n"

                if int(clientServerList[str(sampleLanList[0])]) != 1 and int(clientServerList[str(sampleLanList[1])]) != 1:
                    if allLan == 0 and anyLan == 0:
                        print("ERROR:\t ALL or ANY keyword must be specified for node more than 1, Node:",str(sampleLanList[0]),",",str(sampleLanList[1]))
                        minimum = 1
                else:
                    minimum = 1
                for k in sampleLanList:
                    if minimum == 1:
                        counter+=1
                        nsCommands += "set lan"+ str(counter) +" "
                        nsCommands += "[$ns make-lan"
                        nsCommands += " \""
                        if clientServerList[str(sampleLanList[0])] == 1:
                            nsCommands += "$"+ str(sampleLanList[0]) +" "
                        else:
                            nsCommands += "$"+ str(sampleLanList[0]) +"0" + " "

                        if clientServerList[str(sampleLanList[1])] == 1:
                            nsCommands += "$"+ str(sampleLanList[1]) +" "
                        else:
                            nsCommands += "$"+ str(sampleLanList[1]) +"0" + " "

                        nsCommands += "\""
                        nsCommands += " " + "100Mb 0ms" + "]\n"
                        nsCommands += "tb-set-lan-loss"
                        nsCommands += " " + "$" + "lan" + str(counter) + " " + ".02"
                        nsCommands += "\n"
                    else:
                        for j in range(0,minimum):
                            counter+=1
                            nsCommands += "set lan"+ str(counter) +" "
                            nsCommands += "[$ns make-lan"
                            nsCommands += " \""
                            nsCommands += "$"+ str(sampleLanList[0]) + str(j) +" "
                            nsCommands += "$"+ str(sampleLanList[1]) + str(j)
                            nsCommands += "\""
                            nsCommands += " " + "100Mb 0ms" + "]\n"
                            nsCommands += "tb-set-lan-loss"
                            nsCommands += " " + "$" + "lan" + str(counter) + " " + ".02"
                            nsCommands += "\n"
                    break

        for node in clientServerList:
            if node not in nodesInOsList:
                if clientServerList[str(node)] == 1:
                    nsCommands += "tb-set-node-os"
                    nsCommands += " " + "$" + str(node)
                    nsCommands += " " + defaultOS
                    nsCommands += "\n"
                else:
                    for j in range(0,clientServerList[str(node)]):
                        nsCommands += "tb-set-node-os"
                        nsCommands += " " + "$" + str(node) + str(j)
                        nsCommands += " " + defaultOS
                        nsCommands += "\n"

        opt = "set ns [new Simulator]\n"
        opt += "source tb_compat.tcl\n"
        opt += nsCommands
        opt += "$ns rtproto Static\n"
        opt += "$ns run\n"
        return opt, clientServerList
        #self.outputNS()

    def generateBASH(self, scenarios, bindings, clientServerList):
        if not self.bindings:
            self.bindings = ['{} {}'.format(d['key'], d['value']) for d in bindings]

        for s in self.bindings:
            try:
                key,value = self.BindParser.parse_stmt(s)
            except:
                print("ERROR:\tCannot parse the following Scenario statement: %s\n" % s)
                return False
            # See above comment - we return all Nones if statement is un-parsable.
            if key == None or value == None:
                print("ERROR:\tUnparsable Bindings statement: %s\n" % s)
                return False
            self.bindings_parsed[key] = value
        bindings = self.bindings_parsed.copy()
        nodes = []
        helpDict = {}
        exp = "$exp"
        proj = "$proj"
        removeResultFile = "\'rm ~/"
        writeResultFile = "echo $? > ~/"
        writeResult = "\'cat ~/res1\' > lastCmdResult"
        bashScript = ""
        labelSet = False
        labelName = "bashFile.sh"
        resultIter = 1
        idx = 0
        bashScriptList = [[labelName,""]]
        bashTag = "#!/usr/bin/bash\n"
        tab = ""
        commandSupported = ["tcpdump","ping","iperf","nmap","curl","scp","dig","Install_and_run_apache","Install_and_run_bind"]
        events = {}
        eventsValidDict = {}
        lastCmdResultList = {}
        lastCmdResultIter = 1
        args = []
        parser = HLBParser([])
        print("scenario:")
        print(scenarios)
        print("bindings:")
        print(bindings)
        dewString = ""
        dewString += "################################################################################\n"
        tempString = "#\t"
        tempString += "[Scenario]"
        while (len(tempString) < 77):
            tempString += " "
        dewString += tempString
        dewString += "#\n"
        for line in scenarios:
            tempString = "#\t"
            tempString += line
            while (len(tempString) < 77):
                tempString += " "
            dewString += tempString
            dewString += "#\n"

        tempString = "#\t"
        tempString += "[Bindings]"
        while (len(tempString) < 77):
            tempString += " "
        dewString += tempString
        dewString += "#\n"
        for key in bindings:
            tempSplit = bindings[key].split()
            for each in tempSplit:
            	if each[0] == "$" and each[1:]:
            		args.append(each[1:])
            tempString = "#\t"
            tempString += key + " = " + bindings[key]
            while (len(tempString) < 77):
                tempString += " "
            dewString += tempString
            dewString += "#\n"
        dewString += "################################################################################\n"
        bashScript += dewString
        bashScript += bashTag
        if scenarios is not None:
            bashScript += "if [ -z \"$1\" ]\n"
            bashScript += "then\n"
            bashScript += "\techo \"Usage: ./bashFile.sh experimentName projectName [arguments]\"\n"
            bashScript += "\texit 0\n"
            bashScript += "fi\n"
            bashScript += "if [ -z \"$2\" ]\n"
            bashScript += "then\n"
            bashScript += "\techo \"Usage: ./bashFile.sh experimentName projectName [arguments]\"\n"
            bashScript += "\texit 0\n"
            bashScript += "fi\n"
            bashScript += "exp=$1\n"
            bashScript += "proj=$2\n"
            allArgs = ""
            for i in range(len(args)):
                temp = 3 + i
                bashScript += "if [ -z \"$" + str(temp) + "\" ]\n"
                bashScript += "then\n"
                allArgs += args[i] + " "
                bashScript += "\techo \"Usage: ./bashFile.sh experimentName projectName " + allArgs + "\"\n"
                bashScript += "\texit 0\n"
                bashScript += "fi\n"
                bashScript += args[i] + "=" + "$" + str(temp) + "\n"
            for scenario in scenarios:
                scenario = scenario.strip()
                if len(scenario) > 1 and scenario[0] == "@":
                    labelSet = True
                    labelName = scenario[1:].strip() + ".sh"
                    idx += 1
                sampleString = ""
                _t,v,_h = parser.extract_partial(scenario)
                print(v)
                if v['actors'] is not None:
                    if v['t_events'] is not None:
                        for i in v['t_events']:
                            if i  in eventsValidDict:
                                for string in eventsValidDict[i]:
                                    sampleString += tab + string
                                del eventsValidDict[i]
                        sampleString += "if [ -z " + "\"$"
                        temp = ""
                        sampleEvents = ""
                        for i in v['t_events']:
                            if i in bindings.keys():
                                sampleString += temp
                                sampleString += i
                                temp = "\"" + " ]" + " || " + "[ -z \"$"
                                sampleEvents += i + " "
                        sampleString += "\" ]\n"
                        sampleString += "then\n"
                        sampleString += "\t echo \"Events:" + sampleEvents + " is not set\"\n"
                        sampleString += "else\n"
                        tab = "\t"
                    if v['wait_time'] != "None":
                        res = ast.literal_eval(v['wait_time'])
                        for i in res:
                            if i in bindings.keys():
                                sampleString += tab + "sleep " + bindings[i] + "\n"
                    if v['action'] is not None and v['action'] in bindings.keys():
                        try:
                            if re.search('expIP\(([^)]+)', bindings[v['action']]):
                               tempNode = re.search('\(([^)]+)', bindings[v['action']]).group(1)
                               bindings[v['action']] = re.sub(r'expIP(.*)', r'`inet ip exp ' + tempNode + '`', bindings[v['action']])
                            elif re.search('expIP', bindings[v['action']]):
                               bindings[v['action']] = re.sub(r'expIP', r'`inet ip exp` ', bindings[v['action']])

                            if re.search('ctlIP', bindings[v['action']]):
                                 bindings[v['action']] = re.sub(r'ctlIP', r'`inet ip ctl` ', bindings[v['action']])

                            if re.search('expeth\(([^)]+)', bindings[v['action']]):
                               tempNode = re.search('\(([^)]+)', bindings[v['action']]).group(1)
                               bindings[v['action']] = re.sub(r'expeth(.*)', r'`inet eth exp ' + tempNode + '`', bindings[v['action']])
                            elif re.search('expeth', bindings[v['action']]):
                               bindings[v['action']] = re.sub(r'expeth', r'`inet eth exp` ', bindings[v['action']])

                            if re.search('proj ', bindings[v['action']]):
                                 bindings[v['action']] = re.sub(r'proj', r'`pexp -p` ', bindings[v['action']])

                            if re.search('node ', bindings[v['action']]):
                                 bindings[v['action']] = re.sub(r'node', r'`pexp -n` ', bindings[v['action']])

                            if re.search('epoch', bindings[v['action']]):
                                 bindings[v['action']] = re.sub(r'epoch', r'`epoch`', bindings[v['action']])

                        except AttributeError:
                            print("Attribute Error")

                        temp = bindings[v['action']]
                        sampleList = temp.split()
                        if temp:
                            #if sampleList[0] in commandSupported:
                            if sampleList[0]:
                                tempStr = ""
                                helpList=[]
                                for val in sampleList:
                                    if val in clientServerList:
                                        if clientServerList[val] != 1:
                                            if val == sampleList[-1]:
                                                bindings[v['action']] = bindings[v['action']].replace(" "+val," "+val+"0")
                                            else:
                                                bindings[v['action']] = bindings[v['action']].replace(" "+val+" "," "+val+"0"+" ")
                                    else:
                                        if len(val) > 1:
                                            if val.find("$") == 0:
                                                helpList.append(val[1:])
                                                tempStr += "'" + val[1:] + "'" + " "
                                            else:
                                                result = re.search(r"\(([$A-Za-z0-9_]+)\)", val)
                                                if result is not None:
                                                    if result.group(1):
                                                        t = result.group(1)
                                                        helpList.append(t[1:])
                                                        tempStr += "'" + t[1:] + "'" + " "
                                if helpList:
                                    if helpList[0] not in helpDict:
                                        bashScript += "if [[ -z ${" + helpList[0] +"} ]]"
                                        helpDict[helpList[0]] = 1
                                        for var in helpList[1:]:
                                            bashScript += " || [[ -z ${" + var +"} ]]"
                                        bashScript += "\nthen\n"
                                        bashScript += "\techo \"Usage: ./bashFile.sh experimentName projectName [arguments:" + "tempStr" + "]\"\n"
                                        bashScript += "\texit 0\n"
                                        bashScript += "fi\n"

                                if v['e_events'] is not None:
                                    tempResult = v['e_events'][0]
                                    sampleString += tab + "rm -f " + "~/" + v['e_events'][0] + "\n"
                                else:
                                    tempResult = "res" + str(resultIter)
                                    sampleString += tab + "rm -f " + "~/"
                                    sampleString += tempResult
                                    sampleString += "\n"
                                if clientServerList[v['actors'][0]] == 1:
                                    sampleString += tab + "ssh "+ v['actors'][0] + "." + exp + "." + proj + ".isi.deterlab.net "
                                else:
                                    sampleString += tab + "ssh "+ v['actors'][0] + str(min(0, clientServerList[v['actors'][0]])) + "." + exp + "." + proj + ".isi.deterlab.net "
                                if v['e_events'] is not None:
                                    sampleString += "\'"
                                    sampleString += bindings[v['action']]
                                    sampleString += ";"
                                    sampleString += "echo $? > " + "~/" + v['e_events'][0] + "\' &"
                                else:
                                    sampleString += "\'"
                                    sampleString += bindings[v['action']]
                                    sampleString += ";"
                                    sampleString += writeResultFile
                                    sampleString += tempResult
                                    sampleString += "\' &"
                                    resultIter += 1
                                sampleString += "\n"
                                if tempResult not in eventsValidDict:
                                    eventsValidDict[tempResult] = []
                                eventsValidDict[tempResult].append("while [ ! -e ~/" + tempResult +" ] ; do\n")
                                eventsValidDict[tempResult].append("\tsleep 1\n")
                                eventsValidDict[tempResult].append("done\n")
                                if clientServerList[v['actors'][0]] == 1:
                                    if v['e_events'] is not None:
                                        eventsValidDict[tempResult].append("lastCmdResult" + str(lastCmdResultIter) + "=" + "`ssh "+ v['actors'][0] + "." + exp + "." + proj + ".isi.deterlab.net \'cat ~/" + tempResult + "\'`\n")
                                        lastCmdResultList[v['e_events'][0]] = "lastCmdResult" + str(lastCmdResultIter)
                                        lastCmdResultIter += 1
                                    else:
                                        eventsValidDict[tempResult].append("lastCmdResult" + "=" + "`ssh "+ v['actors'][0] + "." + exp + "." + proj + ".isi.deterlab.net \'cat ~/" + tempResult + "\'`\n")
                                else:
                                    if v['e_events'] is not None:
                                        eventsValidDict[tempResult].append("lastCmdResult" + str(lastCmdResultIter) + "=" + "`ssh "+ v['actors'][0] + str(min(0, clientServerList[v['actors'][0]])) + "." + exp + "." + proj + ".isi.deterlab.net \'cat ~/" + tempResult + "\'`\n")
                                        lastCmdResultList[v['e_events'][0]] = "lastCmdResult" + str(lastCmdResultIter)
                                        lastCmdResultIter += 1
                                    else:
                                        eventsValidDict[tempResult].append("lastCmdResult" + "=" + "`ssh "+ v['actors'][0] + str(min(0, clientServerList[v['actors'][0]])) + "." + exp + "." + proj + ".isi.deterlab.net \'cat ~/" + tempResult + "\'`\n")
                                if v['t_events'] is not None:
                                    tempString = ""
                                    for i in v['t_events']:
                                        if i in eventsValidDict:
                                            for string in eventsValidDict[i]:
                                                tempString += tab + string
                                            del eventsValidDict[i]
                                    tempString = ""
                                    if tempResult in eventsValidDict.keys():
                                        for string in eventsValidDict[tempResult]:
                                            tempString += tab + string
                                    del eventsValidDict[tempResult]
                                    sampleString += tempString
                                    sampleString += "fi\n"
                                tab = ""
                    if v['e_events'] is not None:
                        for i in v['e_events']:
                            if i in bindings.keys():
                                try:
                                    if re.search('expIP\(([^)]+)', bindings[i]):
                                        tempNode = re.search('\(([^)]+)', bindings[v['action']]).group(1)
                                        bindings[i] = re.sub(r'expIP(.*)', r'`inet ip exp ' + tempNode + '`', bindings[i])
                                    elif re.search('expIP', bindings[i]):
                                        bindings[i] = re.sub(r'expIP', r'`inet ip exp` ', bindings[i])

                                    if re.search('ctlIP', bindings[i]):
                                         bindings[i] = re.sub(r'ctlIP', r'`inet ip ctl` ', bindings[i])

                                    if re.search('expeth\(([^)]+)', bindings[i]):
                                        tempNode = re.search('\(([^)]+)', bindings[v['action']]).group(1)
                                        bindings[i] = re.sub(r'expeth(.*)', r'`inet eth exp ' + tempNode + '`', bindings[i])
                                    elif re.search('expeth', bindings[i]):
                                        bindings[i] = re.sub(r'expeth', r'`inet eth exp` ', bindings[i])

                                    if re.search('proj ', bindings[i]):
                                         bindings[i] = re.sub(r'proj', r'`pexp -p` ', bindings[i])

                                    if re.search('node ', bindings[i]):
                                        bindings[i] = re.sub(r'node', r'`pexp -n` ', bindings[i])

                                    if re.search('epoch', bindings[i]):
                                        bindings[i] = re.sub(r'epoch', r'`epoch`', bindings[i])
                                except AttributeError:
                                    print("Attribute Error")

                                events[i] = bindings[i]
                                if i not in eventsValidDict:
                                    eventsValidDict[i] = []
                                eventsValidDict[i].append(i + "=\"\"\n")
                                if i in lastCmdResultList:
                                    eventsValidDict[i].append("if [ " + "$" + lastCmdResultList[i] + " -eq 0 ]\n")
                                else:
                                    eventsValidDict[i].append("if [ " + "$lastCmdResult" + " -eq 0 ]\n")
                                eventsValidDict[i].append("then\n")
                                if re.search('success', bindings[i], re.IGNORECASE):
                                    eventsValidDict[i].append("\t" + i +  "=`echo $?`\n")
                                elif re.search('pexists', bindings[i], re.IGNORECASE):
                                        try:
                                            tempNode = re.search('\(([^)]+)', bindings[i]).group(1)
                                            tempSplit = bindings[tempNode].split()
                                            eventsValidDict[i].append("\t" + i + "=" + "`ssh "+ v['actors'][0] + str(min(0, clientServerList[v['actors'][0]])) + "." + exp + "." + proj + ".isi.deterlab.net \'pidof " + tempSplit[0] + "\'`\n")
                                            eventsValidDict[i].append("\twhile [ ! -e ~/" + i +" ] ; do\n")
                                            eventsValidDict[i].append("\t\tsleep 1\n")
                                            eventsValidDict[i].append("\t\t" + i + "=" + "`ssh "+ v['actors'][0] + str(min(0, clientServerList[v['actors'][0]])) + "." + exp + "." + proj + ".isi.deterlab.net \'pidof " + tempSplit[0] + "\'`\n")
                                            eventsValidDict[tempResult].append("\tdone\n")
                                        except AttributeError:
                                            eventsValidDict[i].append("\t" + bindings[i] + "\n")
                                            eventsValidDict[i].append("\t" + i + "=`echo $?`\n")
                                else:
                                    eventsValidDict[i].append("\t" + bindings[i] + "\n")
                                    eventsValidDict[i].append("\t" + i + "=`echo $?`\n")
                                eventsValidDict[i].append("fi\n") 
                                #if bindings[i].find("SUCCESS") == -1 or bindings[i].find("Success") == -1 or bindings[i].find("success") == -1:
                if idx < len(bashScriptList):
                    if not bashScriptList[idx][1]:
                        bashScriptList[idx][1] += bashScript
                    bashScriptList[idx][1] += sampleString
                else:
                    tempString = ""
                    for i in eventsValidDict.keys():
                        for string in eventsValidDict[i]:
                            tempString += tab + string
                    eventsValidDict = {}
                    bashScriptList.append([labelName, bashScript + sampleString + tempString])
        #print(events)
        #print(bashScriptList)
        if idx == 0:
            tempString = ""
            for i in eventsValidDict.keys():
                for string in eventsValidDict[i]:
                    tempString += tab + string
            eventsValidDict = {}
            bashScriptList[idx][1] += tempString
        return bashScriptList
