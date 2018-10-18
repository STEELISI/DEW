import sys
sys.path.insert(0, '../')
from generator import GeneralGenerator

class Generator(GeneralGenerator):
    def __init__(self, *args, **kwargs):
        super(Generator, self).__init__(*args, **kwargs, name="bash")
        print("HI there. My name is: %s" % self.name)     
        pass
