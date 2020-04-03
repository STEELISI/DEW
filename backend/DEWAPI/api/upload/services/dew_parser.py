import configparser, sys
sys.path.append('./DewFunctions/UI/HighLevelBehaviorLanguage/')
from hlb_parser import HLBParser

class DEWParser(object):
    def get_behaviors_and_constraints(self, dew_text):
        config = configparser.ConfigParser(allow_no_value=True)
        config.read_string(dew_text)
        behaviors = [key for key in config['Scenario']]
        constraints = [key for key in config['Constraints']]
        bindings = [key for key in config['Bindings']]
        actors = self.extract_actors(behaviors)
        return {'behaviors': behaviors, 'constraints': constraints, 'bindings': bindings, 'actors': actors}
    
    def extract_actors(self, behaviors):
        actors = set()
        hlbparser = HLBParser(actors)
        for behavior in behaviors:
            print(hlbparser.parse_stmt(behavior))
            type,vals,hints = hlbparser.extract_partial(behavior)
            print(vals, hints, type, behavior)
            if "actors" in vals and vals["actors"] != None:
                actors = actors.union(vals["actors"])
        return actors
        