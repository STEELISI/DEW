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
            generator.generate()
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
    def HandleBASH(self,json_data):
        errors = []
        parameterlist = [] # added for run script. 
        actors = json_data['actors']
        scenario = json_data['behaviors']
        constraints = json_data['constraints']
        bindings = json_data['bindings']
        generator = bashGenerator(constraints=constraints, scenario=scenario, bindings=bindings)
        generator.generate()
        # print(generator.text)
        bash_script_list = []
        for label in generator.run.keys():
            bash_script_list.append(['run_'+label+'.sh',generator.run[label]])
            bash_script_list.append(['cleanup_'+label+'.sh',generator.clear[label]])
            print(bash_script_list)
            
        for e in generator.evars:
            parameterlist.append({"variable":e[0],"message":e[1]})
        return bash_script_list, parameterlist
