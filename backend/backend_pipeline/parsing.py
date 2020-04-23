import configparser, sys
import os



commands_list = ['wait', 'when']
def get_behaviors_and_constraints(self, dew_text):
    config = configparser.ConfigParser(allow_no_value=True)
    x = config.read_string(dew_text)
    print("config read this", x)
    behaviors = [key for key in config['Scenario']]
    constraints = [key for key in config['Constraints']]
    bindings = [key for key in config['Bindings']]
    actors = self.extract_actors(behaviors)
    return {'behaviors': behaviors, 'constraints': constraints, 'bindings': bindings, 'actors': actors}

def get_actor_binding_map(scenario, temp_dict):
    # print(scenario)
    if len(scenarios == 2):
        temp_dict[scenario[0]] = scenario[1]
    if len(scenarios) >2:
        print("to do ")
    return temp_dict

def parse_when(i,scenarios):
    print("in parsing when", i,scenarios)
def parse_wait(i,scenarios):
    print("in parse wait", i,scenarios)
def read_scenarios(scenarios):
    scenarios_map = {}
    actor_binding_map = {}

    for i in range(len(scenarios)):
        # print(scenario)
        if scenarios[i][0] not in commands_list:
            temp_dict={}
            temp_result = get_actor_binding_map(scenarios[i],temp_dict)
            actor_binding_map[i] = temp_result
        # print(actor_binding_map)
        func_name = 'parse'
        if scenarios[i][0] in commands_list:
            calling_func_name = func_name+'_'+scenarios[i][0]+'()'
            if calling_func_name == 'parse_when()':
                parse_when(i,scenarios[i])
            if calling_func_name == 'parse_wait()':
                parse_wait(i,scenarios[i])
            # if scenarios[i][0]== 'when':


def create_dependecies(bindings, scenarios):

    read_scenarios(scenarios)

def get_list_bindings_scenario(dew_data_file_path):
    f = open(dew_data_file_path, "r")

    scenarios = []
    bindings = []
    line = f.readline().strip()
    # cnt = 1
    while line:

        if line == 'scenario':
            line = f.readline().strip()

            while line != 'bindings' and line != None:
                z = line.split(" ")
                # print("z is", z)
                if z[0] != 'bindings':
                    # print("added", z)
                    scenarios.append(z)
                    line = f.readline().strip()

            line = f.readline().strip()
            while "" != line and line != 'scenario':
                z = line.split(" ")
                if z[0] != 'scenario':
                    bindings.append(z)
                line = f.readline().strip()
        line = f.readline().strip()
    return bindings, scenarios
if __name__ == "__main__":
    dew_data_file_path = os.path.join(os.getcwd(), 'dew.conf')
    bindings, scenarios = get_list_bindings_scenario(dew_data_file_path)
    # print(bindings)
    # print(scenarios)
    create_dependecies(bindings, scenarios)
