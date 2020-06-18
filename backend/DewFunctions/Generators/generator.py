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

from hlb_parser import HLBParser, ConstraintParser

nsCommands = ""

class GeneralGenerator(object):
    # scenario and constraints given as a list.
    def __init__(self, scenario, constraints=None, name='Generic Class'):
        # For debugging. Subclass should set this to something meaningful. e.g. "bash"
        self.name = name

        # A list of DEW constraints. E.g. ['num actorA 3', 'os actorB ubuntu']
        self.constraints = constraints

        # A list of Scenario statements. E.g. ['Scenario statement 1', 'Scenario statement 2']
        # The order of the list is not meaningful.
        self.scenario = scenario

        # Imported from hlb_parser.
        self.HLBparser = HLBParser(globals.actors)
        self.ConstParser = ConstraintParser()

        # After we parse statements, we store them as a list of tuples (one tuple per statement).
        self.scenario_parsed = []
        self.constraints_parsed = []


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


    def outputNS(self, filename="nsFile.txt"):
        #This function writes the generated NS commands to nsFile.txt.
        global nsCommands
        opt = "set ns [new Simulator]\n"
        opt += "source tb_compat.tcl\n"
        opt += nsCommands
        opt += "$ns rtproto Static\n"
        opt += "$ns run\n"
        with open(filename, 'w') as f:
            f.write(opt)

    def generateNS(self, constraintList):
        #This function generates the corresponding NS commands based on the constraint List.
        #Currently, we are handling node, link, lan and os list.
        #Any new constraint list must be handled here.
        nodeList = []
        linkList = []
        lanList = []
        locationList = []
        osList = []

        for i in constraintList:
            for x in i:
                if x == "num":
                    nodeList.append(i)
                    #print(nodeList)
                    break
                elif x == "os":
                    osList.append(i)
                    #print(osList)
                    break
                elif x == "lan":
                    lanList.append(i)
                    #print(lanList)
                    break
                elif x == "location":
                    locationList.append(i)
                    #print(locationList)
                    break
                elif x == "link":
                    linkList.append(i)
                    #print(linkList)
                    break
        global nsCommands
        clientServerList = {}
        if len(nodeList):
            for x in nodeList:
                sampleString = "for { set i 0} {$i < "
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
                sampleString += count
                sampleString += "} {incr i} {\n"
                sampleString += "\tset "
                sampleString += str(temp)
                sampleString += "$i [$ns node]\n"
                sampleString += "}\n"
                nsCommands += sampleString

        if len(linkList):
           counter = 0
           sampleList = []
           for x in linkList:
                c = 0
                sampleList.clear()
                for y in x:
                    if y == "link" or y == None:
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
                            minimum = clientServerList[k]
                    else:
                        print("ERROR:\t Node is not defined, Cannot be converted to NS command:", x)
                        minimum = 0
                        break;
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
                for y in x:
                    if y == "os" or y == None:
                        continue
                    for k in y:
                        if k in clientServerList:
                            node = k
                        else:
                            os = k

                if str(node) in clientServerList:
                    for j in range(0,clientServerList[str(node)]):
                        nsCommands += "tb-set-node-os"
                        nsCommands += " " + "$" + str(node) + str(j)
                        nsCommands += " " + str(os)
                        nsCommands += "\n"
                else:
                    print("ERROR:\t Node is not defined, Cannot be converted to NS command:", x)

        if len(lanList):
           counter = 0
           sampleLanList = []
           for x in lanList:
                c = 0
                sampleLanList.clear()
                for y in x:
                    if y == "lan" or y == None:
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
                            minimum = int(clientServerList[str(k)])
                for k in sampleLanList:
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
        self.outputNS()
