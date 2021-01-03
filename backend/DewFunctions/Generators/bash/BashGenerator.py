import os.path
import sys


cwd = os.path.dirname(os.path.realpath(__file__))
parentDir = os.path.abspath(os.path.join(cwd, os.pardir))
sys.path.insert(0, parentDir)
from generator import Generator

class BashGenerator(Generator):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, name="bash", **kwargs)
        self.scenario = args[0]
        self.constraints = args[1]
        self.bindings = args[2]
        print("Created bash")

    def generate(self):
        super().generate()
        print("Bash generate")

        self.generatePreamble()
        
        for s in self.scenario_parsed:
            print("Scen ", s)


    def generatePreamble(self):
        self.text = open('bash/bash_preamble.txt', 'r').read()


    def parse(self):
        super().parse()



