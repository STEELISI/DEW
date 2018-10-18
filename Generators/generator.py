# XXX We need to redo the directory structure so core functions (like HLB parsing) are more central.
# In the meantime:
import sys
sys.path.insert(0, '../UI/HighLevelBehaviorLanguage/')
sys.path.insert(0, '../UI/')
from hlb_parser import HLBParser, ConstraintParser

class GeneralGenerator():
    # hlb and constraints given as a list.
    def __init__(self, hlb, constraints=None, name='Generic Class'):	
        self.name = name
        self.hlb = hlb
        self.constraints = constraints
        self.HLBparser = HLBParser()
        self.ConstParser = ConstraintParser()
    
    def parseHLB(self):
        pass    
    
    def graphDependency(self):
        pass
        
    def generate(self):
        # Walk the dependency graph - kick out sets of commands (plus constraints that apply) 
        # that can start/run simultaneously. 
        # XXX For now, this is its own code here, BUT we should not duplicate functionality
        # XXX between the generator and the UI that shows the dependency graph.
        pass
    
    
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

    
    