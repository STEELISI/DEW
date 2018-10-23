# XXX We need to redo the directory structure so core functions (like HLB parsing) are more central.
# In the meantime:
import sys
sys.path.insert(0, '../UI/HighLevelBehaviorLanguage/')
sys.path.insert(0, '../UI/')
from hlb_parser import HLBParser, ConstraintParser

class GeneralGenerator():
    # hlb and constraints given as a list.
    def __init__(self, hlb, constraints=None, name='Generic Class'):	
        # For debuggging. Subclass should set this to something meaningful. e.g. "bash"
        self.name = name
        
        # A list of DEW constraints. E.g. ['num actorA 3', 'os actorB ubuntu']
        self.constraints = constraints

        # A list of HLB statements. E.g. ['HLB statement 1', 'HLB statement 2']
        # The order of the list is not meaningful.
        self.hlb = hlb

        # Imported from hlb_parser.
        self.HLBparser = HLBParser()
        self.ConstParser = ConstraintParser()
    
        # After we parse statements, we store them as a list of tuples (one tuple per statement).
        self.hlb_parsed = []
        self.constraints_parsed = []
    
    def parse(self):
        # For each item in our hlb/constriants lists, make sure we can parse it and 
        # turn it into tuplets.     
        # HLB -> ['trigger events', 'actors', 'action', 'emit events', 'wait time'] 
        # (note, some of these can be None)
        
        # Constraints -> ['constraint type', 'target', 'value' ] (some of these can be None)
        for c in self.constraints:
            try:	
                parsedTuple = self.ConstParser.parse_stmt(c)
            except:
                print("ERROR:\tCannot parse the following constraint: %s" % (c))
                return False
            # Because we use parsing for UI suggestions, we don't throw exceptions
            # when we can't parse a statement, instead the parser returns a tuplet of Nones.
            if all(x == None for x in parsedTuple):
                print("ERROR:\tUnparsable constraint: %s" % (c))
                return False
                
            # XXX Right now, for generation we only care about 'num' constraints.
            # XXX At some point we may care about others, like 'os'.
            if 'num' == parsedTuple[0]:
                self.constraints_parsed.append(parsedTuple)
        
        for h in self.hlb:
            try:
                parsedTuple = self.HLBparser.parse_stmt(h)
            except:
                print("ERROR:\tConnot parse the following HLB statement: %s" %(h))
                return False
            # See above comment - we return all Nones if statement is unparsable.
            if all(x == None for x in parsedTuple):
                print("ERROR:\tUnparsable HLB statement: %s" % (h))
                return False
            self.hlb_parsed.append(parsedTuple)
                        
    
    def graphDependency(self):
        # We only need dependencies for HLB. 
        
        
    def generate(self):
        # Parse all our HLB and Constraints. 
        if not self.parse():
            exit()
    
        # Figure out dependencies
        # XXX For now, this is its own code here, BUT we should not duplicate functionality
        # XXX between the generator and the UI that shows the dependency graph.
        if not self.graphDependency():
            exit()    
    
    
    def translate(self):
        # THIS FUNCTION SHOULD BE OVERRIDDEN BY SPECIFIC GENERATOR.
        # XXX We may find that we need more info than this group by group approach:
        # XXX but for now, we tranlate a set of HLB commands at a time which can be
        # started at the same time.
        # Any constraints that apply to the targets (HLB actors) in the commands
        # are also packaged with the HLB command set.
        pass
        
    
    def output(self, filename=None):
        pass

    
    