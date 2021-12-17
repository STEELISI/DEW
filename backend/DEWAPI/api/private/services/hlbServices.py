import sys, os, uuid
from collections import defaultdict

sys.path.append('./DewFunctions/Generators/')
sys.path.append('./DewFunctions/Generators/ns')
sys.path.append('./DewFunctions/Generators/bash')
sys.path.append('./DewFunctions/UI/HighLevelBehaviorLanguage/')
sys.path.append('./DewFunctions/UI/')
sys.path.append('./DewFunctions/Translators/bash')
sys.path.append('./DewFunctions/Translators/magi')
import globals
import json
import hlb
import re
from parsebash import GeneralParseBash
from generator import Generator
from BashGenerator import BashGenerator as bashGenerator
from NSGenerator import NSGenerator as nSGenerator
from hlb_parser import HLBParser, HLBHintType
from magiparser import GeneralParseMagi
import werkzeug

class HLBService():
    #   Handle Behavior Suggestions On Each Key Press
    def HandleBehaviorSuggestions(self, behaviors, given_actors, last_behavior):
        '''
        Takes an array of behaviors which are already completed and the last_behavior as the input and provides suggestion for the last behavior
        '''
        i=0
        # parse out events, globals.actors, actions and methods
        # from every line but the last

        parser = HLBParser(given_actors)
        # TODO : Remove globals
        for b in behaviors:
            globals.behaviors[i] = b
            i = i + 1

            type,vals,hints = parser.extract_partial(b)
            #print type, vals, hints
            if "actors" in vals and vals["actors"] != None:
                for a in vals["actors"]:
                    if a not in globals.actors:
                        self.addactor(a)

            if "action" in vals and vals["action"] != None:
                a=vals["action"]
                if a not in globals.actions:
                    globals.actions[a] = 1

            if "e_events" in vals and vals["e_events"] != None:
                for a in vals["e_events"]:
                    if a not in globals.events:
                        globals.events[a] = 1

        # Go through last behavior line to see what is the current state
        # start (waitd, wait) or (whene, when) or actor, actor, action, method, emit, done
        print("hello:::::::::",len(last_behavior),"::::")

        if last_behavior.startswith("@"):
            return self.addSuggestions(["enter label name"])

        type,vals,hints = parser.extract_partial(last_behavior)

        print(type)
        #print type,vals,hints
        if (type == HLBHintType.BLANK):
            return self.addSuggestions(["behaviors_enter"])
        elif(type == HLBHintType.REQ_WHEN_LIST):
             return self.addSuggestions(["events_only","enter event name"])
        elif(type == HLBHintType.REQ_ACTORS_HAVEWHEN):
            return self.addSuggestions(["when_enter"])
        elif(type == HLBHintType.REQ_WAIT_TIME):
            return self.addSuggestions(["enter variable name or wait time in second"])
        elif(type == HLBHintType.REQ_ACTORS):
            return self.addSuggestions(["actors_only"])
        elif(type == HLBHintType.REQ_ACTION):
            if (last_behavior.endswith(" ")):
                items = last_behavior.strip().split(" ")
                item = items[-1].strip(",")
                if item not in globals.actors:
                    self.addactor(item)
            return self.addSuggestions(["actions_only",  "enter action"])
            '''"actors_only",'''
        elif(type == HLBHintType.OPT_EMIT_STMT):
            if (last_behavior.endswith(" ")):
                items = last_behavior.strip().split(" ")
                item = items[-1].strip(",")
                if item not in globals.actions:
                    globals.actions[item] = 1

            return self.addSuggestions(["emit"])
        elif (type == HLBHintType.REQ_EMIT_LIST):
            return self.addSuggestions(["enter event name(s)"])


        return ['wait', 'emit', 'server', 'client', 'install_iperf', 'install_flooder', 'install_tcpdump', 'start_measure', 'start_server', 'mstarted', 'sstarted', 'when', 'mstarted', 'cstarted', 'astarted', 'astopped', 'attacker', 'start_traffic', 'start_attack', 'stop_attack', 'stop_traffic', 'cstopped', 'mstopped', 'calculate_entropy', 'stop_measure', 'COPY_TO_GITHUB'], ""

    def addactor(self, item):
        globals.actors[item] = 1
        globals.nodes[item] = 1
        if "lan0" not in globals.lans:
            globals.lans["lan0"] = dict()
        globals.lans["lan0"][item] = 1

        if ("actor"+str(globals.acn)) in globals.actors:
            globals.acn = globals.acn+1

    def addSuggestions(self, events):
        suggestions, suggestion_text = [], ''
        #scenario = json_data["behaviors"]
        for event in events:
            s,t = hlb.getSuggestionsForEvent(event)
            suggestions = suggestions + s
            suggestion_text = suggestion_text + t
        return suggestions, suggestion_text

    def HandleConstraintSuggestions(self, constraints, actors, last_constraint, scenarios):
        suggestions = []
        parser = HLBParser([])
        globals.actors = {}
        globals.actions = {}
        globals.events = {}
        globals.actors = {}

        for scenario in scenarios:
            _t,v,_h = parser.extract_partial(scenario)
            if v['actors'] is not None:
                for actor in v['actors']:
                    globals.actors[actor] = 1
            if v['e_events'] is not None:
                for events in v['e_events']:
                    globals.events[events] = 1
            if v['action'] is not None:
                globals.actions[v['action']] = 1
        items = re.split("[\s,]",last_constraint.strip())
        item = items.pop(0)
        if item in ["num", "os","nodetype", "interfaces", "location", "link","lan"] and len(items) == 0:
            return self.addSuggestions(["actors_only"])
        elif len(items) >= 1:
            if (item == "num" or item == "interfaces") and items[-1] in globals.actors:
                return self.addSuggestions(["enter digit"])
            elif item == "os" and (items[-1] in globals.actors):
                # for os in globals.deploy_handler.getSuggestions(type='os'):
                    #addSuggestions(os, Centry)
                    # globals.app.addButton(os,Centry)
                    # globals.sbuttons[os]=1
                return self.addSuggestions(["enter OS"])
            elif item == "nodetype" and (items[-1] in globals.actors):
                # for nodetype in globals.deploy_handler.getSuggestions(type='nodetype'):
                #     globals.app.addButton(nodetype,Centry)
                #     globals.sbuttons[nodetype]=1
                return self.addSuggestions(["enter node type"])
            elif item == "link" and (items[-1] in globals.actors):
                return self.addSuggestions(["actors_only"])
            elif item == "lan" and (items[-1] in globals.actors):
                return self.addSuggestions(["actors_only"])
            elif item == "location" and (items[-1] in globals.actors):
                return self.addSuggestions(["enter testbed"])
            else:
               return self.addSuggestions(["constraints_enter"])
        else:
            return self.addSuggestions(["constraints_enter"])

    # Handle Translator
    def HandleTranslator(self,format, data):

        # EXPECTED = {
        #     "Format":["bash", "magi", "go"],
        #     "ReturnType":["dew", "json"]
        # }
        # errors = []

        # parse = reqparse.RequestParser()
        # parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        # args = parse.parse_args()
        # scriptFile = args['file']

        # if format not in EXPECTED["Format"]: errors.append(f"Not Vaild Format, should be bash, magi or go.")
        # if returnType not in EXPECTED["ReturnType"]: errors.append(f"Not Vaild ReturnType, should be dew or json.")
        # if(scriptFile == None): errors.append(f"Not Vaild File.")
        # else:
            # if(os.path.isdir("./UploadedScripts") == False):
            #     os.mkdir("./UploadedScripts")
            # scriptFile.save("./UploadedScripts/" + scriptFile.filename)

            # if(os.stat("./UploadedScripts/" + scriptFile.filename).st_size == 0):
            #     errors.append(f"File is empty.")
            # else:
            #     f = open("./UploadedScripts/" + scriptFile.filename, "r")
            #     data = ""
            #     dewOut = ""
            #     if f.mode == 'r':
            #         data = f.read()
            #     else:
            #         errors.append(f"Can not read from server.")
            #     f.close()

        #file = request.files['file']
        # if len(errors) <1:

            # for stringify json content
            # json_data = request.get_json(force=True)
            # data = json_data['InputFileContent']

            # s = []
            # c = []
            # b = []
            if(format == "bash"):
                return GeneralParseBash.parse(data), []
            if(format == "magi"):
                ## sample input
                #{
                #"  Script": "monitor_agent:\n  execargs: {}\n  group: monitor_group\n  path: /share/magi/modules/pktcounters/pktCountersAgent.tar.gz\nmonitor_group:\n- servernode\nmonitorstream:\n- triggers:\n  - event: serverStarted\n  type: trigger\n- agent: monitor_agent\n  args: {}\n  method: startCollection\n  trigger: collectionServer\n  type: event\n- triggers:\n  - event: clientStopped\n  type: trigger\n- agent: monitor_agent\n  args: {}\n  method: stopCollection\n  type: event\n"
                #}
                return GeneralParseMagi.parse(data)
            if(format == "go"):
                dewOut = "" #TODO: GO format
                return dewOut, [], [], [], []


            # if(os.path.isdir("./ReturnFiles") == False):
            #     os.mkdir("./ReturnFiles")

            # if(returnType == "json"):
            #     return {'Scenario':s, 'Constraints':c, 'Bindings':b}
            # elif(returnType == "dew"):
            #     with open("./ReturnFiles/" + os.path.splitext(scriptFile.filename)[0] + ".dew", "w") as file:
            #         file.write(dewOut)
            #     return send_file("./ReturnFiles/" + os.path.splitext(scriptFile.filename)[0] + ".dew")
        # else:
        #     # Return errors
        #     return {"_id":str(uuid.uuid4()),"errors":errors}

    # Handle Parse
    def HandleParse(self,json_data):
        # EXPECTED = {
        #     "ParseType":["bash", "magi", "go"],
        #     "Scenario":{"min":1,"max":500},
        #     "Constraints":{"min":0,"max":500}
        # }
        # errors = []

        # json_data = request.get_json(force=True)

        # # Check for valid input fields
        # for name in json_data:
        #     if name in EXPECTED:
        #         value = json_data[name]
        #         if(name == "ParseType"):
        #             if value not in EXPECTED[name]:
        #                 errors.append(f"Not Vaild Format, should be bash, magi or go.")
        #         else:
        #             expected_min = EXPECTED[name]['min']
        #             expected_max = EXPECTED[name]['max']
        #             if len(value) < expected_min or len(value) > expected_max:
        #                 errors.append(f"Out of bounds: {name}, has size of: {len(value)}, but should be between {expected_min} and {expected_max}.")
        #     else:
        #         errors.append(f"Unexpected field: {name}.")

        # # Check for missing input fields
        # for name in EXPECTED:
        #     if name not in json_data:
        #         errors.append(f"Missing value: {name}.")

        # if len(errors) <1:
            # Return parse
            tn = json_data['ParseType']
            scenario = json_data['Scenario']
            constraints = json_data['Constraints']

            if tn == 'bash':
                generator = bashGenerator(scenario=scenario, constraints=constraints,bindings=[])
            elif tn == 'magi':
                generator = bashGenerator(scenario=scenario, constraints=constraints,bindings=[]) # TODO: Use magi generator
            generator.parse()
            scenario_parsed, constraints_parsed = generator.scenario_parsed,generator.constraints_parsed
            print(scenario_parsed, constraints_parsed)
            return {"_id": str(uuid.uuid4()), "parsedScenario": scenario_parsed, "parsedConstraints": constraints_parsed}
        # else:
        #     # Return errors
        #     response = {"_id":str(uuid.uuid4()),"errors":errors}
        # return jsonify(response)

    def HandleGraphParse(self, scenarios):
        nodes = []
        edges = []
        t_events = defaultdict(list)
        e_events = defaultdict(list)
        all_any_flags = defaultdict(str)
        parser = HLBParser([])
        i = 0
        for scenario in scenarios:
            i += 1
            if scenario.startswith("@"):
                continue
            _t,v,_h = parser.extract_partial(scenario)
            v["id"] = str(i)
            if v["t_events"] is None:
                v["t_events"] = []
            if v["e_events"] is None:
                v["e_events"] = []
            nodes.append(v)

        for n in nodes:
            if n['e_events'] is not None:
                for e in n['e_events']:
                    e_events[e].append(n['id'])
            if n['t_events'] is not None:
                for e in n['t_events']:
                    if n['all_keyword'] is not None:
                        all_any_flags[n['id']] = 'all'
                    if n['any_keyword'] is not None:
                        all_any_flags[n['id']] = 'any'
                    t_events[e].append(n['id'])

        for e in e_events:
            j = 0
            for s in e_events[e]:
                for t in t_events[e]:
                    j += 1
                    edges.append({ 'id': e + str(j), 'source': s, 'target': t, 'label': e, 'data': {'all_or_any': all_any_flags[t] }})
        return nodes, edges
    
    def HandleGraphParameterParse(self, param, nodesData, edgesData, constraints):
        updated_constraints = []
        parameters = json.loads(param)
        swapped_nodes = json.loads(nodesData)
        edges = json.loads(edgesData)
        nodes = dict((v,k) for k,v in swapped_nodes.items())
        param_names = {
            'operatingSystem': 0,
            'hardwareType': 1,
            'ipAddress': 2,
            'num': 3
        }
        swapped_param_names = dict((v,k) for k,v in param_names.items())
        swapped_param_names[param_names['operatingSystem']] = 'os'
        swapped_param_names[param_names['ipAddress']] = 'location'
        swapped_param_names[param_names['hardwareType']] = 'nodeType'
        tempStruct = {}
        len_keys = len(nodes.keys())
        for i in nodes.keys():
            tempStruct[i] = [""] * len_keys
        for i in parameters.keys(): #Populate the tempStruct 
            for j in parameters[i].keys():
                try:
                    tempStruct[int(i)][param_names[j]] = parameters[i][j]
                except:
                    pass
                pass
        param_list = []
        current_param_list = []
        current_nodes = []
        temp_tempStruct = tempStruct.copy()
        for i in tempStruct.keys():
            if('lan' in nodes[i]):
                continue
            temp_tempStruct.pop(i, None)
            while(tempStruct[i].count("") != len(tempStruct[i])):        
                current_nodes = [i]
                current_param_list = []
                maxCount = 0
                for j in temp_tempStruct.keys():
                    count = 0
                    param_list = []
                    for k in range(len(temp_tempStruct[j])):
                        if(tempStruct[i][k]==tempStruct[j][k] and tempStruct[i][k]!=""):
                            count = count + 1
                            param_list.append(k)
                    if(maxCount == count and count!=0):
                        missing_params = [i for i in current_param_list if i not in param_list]
                        if(missing_params == []):
                            current_nodes.append(j)
                    if(maxCount<count):
                            maxCount = count
                            current_nodes = [i,j]
                            current_param_list = param_list
                if(maxCount == 0):
                    for j in range(len(tempStruct[i])):
                        if(tempStruct[i][j]!=""):
                            current_param_list.append(j)
                sentence = ""
                for j in current_nodes:
                    sentence = sentence + nodes[j] + " "
                sentence = sentence + "[ "
                for j in current_param_list:
                    sentence = sentence + swapped_param_names[j] + " " + tempStruct[i][j] + ", "
                    for k in current_nodes:
                        tempStruct[k][j] = ""
                sentence = sentence[:-2] + " ]"
                updated_constraints.append(sentence)
        lan_edges = {}
        param_names = {'bandwidth': 'bw', 'delay': 'delay'}
        for i in edges.keys():
            node = i.split('-')
            if('lan' in node[1]):
                if(node[1] not in lan_edges.keys()):
                    lan_edges[node[1]] = []
                lan_edges[node[1]].append(node[0])
            else:
                sentence = "link "
                sentence = sentence + node[0] + " " + node[1] + " [ "
                for k in param_names.keys():
                    sentence = sentence + param_names[k] + " " + parameters[str(edges[i]['id'])][k] + ", "
                sentence = sentence[:-2] + " ]"
                updated_constraints.append(sentence)
        for i in lan_edges.keys():
            sentence = "lan "
            for j in lan_edges[i]:
                sentence = sentence + j + " "
            sentence = sentence + "[ "
            for k in param_names.keys():
                    sentence = sentence + param_names[k] + " " + parameters[str(swapped_nodes[i])][k] + ", "
            sentence = sentence[:-2] + " ]"
            updated_constraints.append(sentence)
        return (updated_constraints)

    def HandleTopologyParse(self,sceanrios,constraints):
        actors = dict()
        lans = []
        edges = []
        gen = bashGenerator(scenario=sceanrios,constraints=constraints,bindings=[])
        gen.generate()
        parsed_scenario, parsed_constraints = gen.scenario_parsed, gen.constraints_parsed
        #Get Features from Constraints
        actor_os = {}
        actor_location = {}
        actor_nodetype = {}
        actor_interfaces = {}
        actor_num = {}
        for const in parsed_constraints:
            if(const[0]=='config'):
                temp_os = 'default'
                temp_location = 'default'
                temp_nodetype = 'default'
                temp_interfaces = 'default'
                temp_num = 1
                for i in range(0, len(const[2]), 2):
                    if(const[2][i]=='os'):
                        temp_os = const[2][i+1]
                    if(const[2][i]=='location'):
                        temp_location = const[2][i+1]
                    if(const[2][i]=='nodetype'):
                        temp_nodetype = const[2][i+1]
                    if(const[2][i]=='interfaces'):
                        temp_interfaces = const[2][i+1]
                    if(const[2][i]=='num'):
                        temp_num = const[2][i+1]
                for i in const[1]:
                    actor_os[i] = temp_os
                    actor_location[i] = temp_location
                    actor_nodetype[i] = temp_nodetype
                    actor_interfaces[i] = temp_interfaces
                    actor_num[i] = temp_num
            else:
                continue
        for s in parsed_scenario:
            if(s[1][0] not in actor_nodetype.keys()):
                  actor_nodetype[s[1][0]] = 'default'
            if(s[1][0] not in actor_location.keys()):
                  actor_location[s[1][0]] = 'default'
            if(s[1][0] not in actor_interfaces.keys()):
                  actor_interfaces[s[1][0]] = 'default'
            if(s[1][0] not in actor_os.keys()):
                  actor_os[s[1][0]] = 'default'
            if(s[1][0] not in actor_num.keys()):
                  actor_num[s[1][0]] = 1
            actors[s[1][0]] = dict({ 'num': str(actor_num[s[1][0]]), 'os': actor_os[s[1][0]], 'nodeType': actor_nodetype[s[1][0]], 'location': actor_location[s[1][0]], 'interfaces': actor_interfaces[s[1][0]] })
        for i, const in enumerate(parsed_constraints):
            if const[0] is not None:
                if "link" in const[0]:
                    delay = 'default'
                    bw = 'default'
                    try:
                        for j in range(0, len(const[2]), 2):
                            if const[2][j] == 'bw':
                                bw = const[2][j+1]
                            elif const[2][j] == 'delay':
                                delay = const[2][j+1]
                    except:
                        pass
                    edges.append({ 'source': const[1][0], 'target': const[1][1], 'delay': delay, 'bw': bw })
                elif "lan" in const[0]:
                    delay = 'default'
                    bw = 'default'
                    try:
                        for j in range(0, len(const[2]), 2):
                            if const[2][j] == 'bw':
                                bw = const[2][j+1]
                            elif const[2][j] == 'delay':
                                delay = const[2][j+1]
                    except:
                        pass
                    nodeName = "lan" + str(i)
                    lans.append({ 'type' : 'lan', 'lineNum': i, 'actors': const[1]})
                    for n in const[1]:
                        edges.append({'source': n, 'target': nodeName, 'delay': delay, 'bw': bw})

        return actors, lans, edges

    def HandleTopologyGraphRemove(self, deleted_node, scenarios, bindings):

        gen = bashGenerator(scenario=scenarios,constraints="",bindings=[])
        gen.generate()
        parsed_scenarios = gen.scenario_parsed
        updated_scenarios = []
        updated_bindings = []

        scenario_parse_index = {
            "when": 0,
            "actor": 1,
            "action": 2,
            "emit": 3,
            "wait": 4
        }

        def generateScenarioSentence(scenario):
            sentence = []
            if scenario[scenario_parse_index["when"]] != None and len(scenario[scenario_parse_index["when"]]) != 0: #when
                sentence.append("when " + ", ".join(scenario[scenario_parse_index["when"]]))
            if scenario[scenario_parse_index["wait"]] != None: #when
                sentence.append("wait " + scenario[scenario_parse_index["wait"]])
            sentence.append(scenario[scenario_parse_index["actor"]][0]) #actor
            sentence.append(scenario[scenario_parse_index["action"]][0]) #action
            if scenario[scenario_parse_index["emit"]] != None: #emit
                sentence.append("emit " + ", ".join(scenario[scenario_parse_index["emit"]]))

            return " ".join(sentence)

        deleted_events = []
        deleted_actions = []
        filtered_parsed_scenarios = []
        
        #Filter scenarios and get all deleted events
        for scenario in parsed_scenarios:
            if deleted_node in scenario[scenario_parse_index["actor"]]:
                if scenario[scenario_parse_index["emit"]] != None:
                    deleted_events += scenario[scenario_parse_index["emit"]]
                deleted_actions += scenario[scenario_parse_index["action"]]
                continue
            filtered_parsed_scenarios.append(scenario)

        #remove all deleted events from when
        for scenario in filtered_parsed_scenarios:
            if scenario[scenario_parse_index["when"]] != None:
                for event in deleted_events:
                    if event in scenario[scenario_parse_index["when"]]:
                        scenario[scenario_parse_index["when"]].remove(event)
            updated_scenarios.append(generateScenarioSentence(scenario))
        
        #filter Bindings
        for binding in bindings:
            if binding["key"] not in deleted_actions and binding["key"] not in deleted_events:
                updated_bindings.append(binding)
                    
        return (updated_scenarios, updated_bindings)

    def HandleTopologyGraphGenerateConstrains(self, nodes, edges, parameters):

        def generateConstrainSentence(constraint):
            def generateParameterSentence(parameters):
                if not parameters:
                    return ""
                return "[ " + ", ".join([parameters[i] + " " + parameters[i+1] for i in range(0,len(parameters), 2)]) + " ]"
            
            if constraint[0] in ['config']:
                return " ".join([" ".join(constraint[1]), generateParameterSentence(constraint[2])])
            elif constraint[0] in ['lan', 'link']:
                return " ".join([constraint[0], " ".join(constraint[1]), generateParameterSentence(constraint[2])])

        node_parameters = {
            "operatingSystem": "os",
            "hardwareType": "nodeType",
            "ipAddress": "location",
            "num": "num"
        }

        edge_parameters = {
            'bandwidth': 'bw',
            'delay': 'delay'
        }

        lan_parameters = {
            'bandwidth': 'bw',
            'delay': 'delay'
        }

        lans = {}
        nodes_group_by_param = defaultdict(set)
        nodes_by_id = dict((str(v),k) for (k,v) in nodes.items())

        for (id, properties) in parameters.items():
            if properties["type"] == 0: #Node
                #Group nodes by their properties
                for (prop, value) in properties.items():
                    if prop in node_parameters and value != "":
                        if prop == "num" and value == "1":
                            continue
                        nodes_group_by_param[(node_parameters[prop], value)].add(id)
            elif properties["type"] == 1: #Edge
                #Do nothing
                pass
            elif properties["type"] == 2: #LAN
                #Store node in LANs and set it properties
                lans[id] = {"nodes": [], "parameters": []}
                for (prop, value) in properties.items():
                    if prop in lan_parameters and value != "":
                        lans[id]["parameters"] += [lan_parameters[prop], value]
                nodes_by_id.pop(id)

        # Group the params by set of nodes
        param_group_by_node = defaultdict(list)
        for (param, node_set) in nodes_group_by_param.items():
            node_hash = tuple(sorted(list(node_set)))
            param_group_by_node[node_hash] += list(param)

        constraints = []

        #Add node properties to constrains
        for (node_list, param) in param_group_by_node.items():
            constraints.append(generateConstrainSentence(('config', list(map(lambda x: nodes_by_id[x], node_list)), param)))

        #Add link and its parametes to constrains
        for (_, edge) in edges.items():
            edge["from"] = str(edge["from"])
            edge["to"] = str(edge["to"])
            edge["id"] = str(edge["id"])

            if edge["from"] in nodes_by_id and edge["to"] in nodes_by_id: #Filter edges connected to LANs
                params = []
                for (prop, value) in parameters[edge["id"]].items():
                    if prop in edge_parameters and value != "":
                        params += [edge_parameters[prop], value]
                constraints.append(generateConstrainSentence(('link', [nodes_by_id[edge["from"]], nodes_by_id[edge["to"]]], params)))
            else: #Add node to lan
                lan_id, node_id = (edge["from"], edge["to"]) if edge["from"] in lans else (edge["to"], edge["from"])
                lans[lan_id]["nodes"].append(nodes_by_id[node_id])

        #Add LAN to constrains
        for lan_prop in lans.values():
            if len(lan_prop["nodes"]) >= 1:
                constraints.append(generateConstrainSentence(('lan', lan_prop["nodes"], lan_prop["parameters"])))

        return constraints

    #Handle generateNS
    def HandleNS(self,json_data):
        errors = []
        actors = json_data['actors']
        scenario = json_data['behaviors']
        constraints = json_data['constraints']
        bindings = json_data['bindings']
        generator = nSGenerator(constraints=constraints, scenario=scenario, bindings=bindings)
        generator.generate()
        ns_script = generator.run['main']
        return ns_script

    #Handle generateBASH
    def HandleBASH(self,json_data,mode=None):
        errors = []
        parameterlist = dict()
        actors = json_data['actors']
        scenario = json_data['behaviors']
        constraints = json_data['constraints']
        bindings = json_data['bindings']
        generator = bashGenerator(constraints=constraints, scenario=scenario, bindings=bindings)
        generator.generate(mode)
        bash_script = []
        for label in generator.run.keys():
            labelDetail = dict()
            labelDetail['label'] = label
            labelDetail['run'] = dict()
            labelDetail['run']['fileName'] = 'run_'+label+'.sh'
            labelDetail['run']['content'] = generator.run[label]
            labelDetail['clean'] = dict()
            labelDetail['clean']['fileName'] = 'cleanup_'+label+'.sh'
            labelDetail['clean']['content'] = generator.clear[label]
            variables = []
            for e in generator.evars[label]:
                variables.append({"variable":e[0],"message":e[1]})
            labelDetail['variables'] = variables
            
            bash_script.append(labelDetail)
        
        return bash_script

    
