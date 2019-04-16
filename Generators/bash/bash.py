import sys
sys.path.insert(0, '../')
from generator import GeneralGenerator

class Generator(GeneralGenerator):
    def __init__(self, *args, **kwargs):
        super(Generator, self).__init__(*args, name="bash", **kwargs)
        self.scenario = args[0]
        self.constraints = kwargs['constraints']

    # def parse(self):
    #     print("Scenario:")
    #     for scenario in self.scenario:
    #         print("\t" + scenario)
    #     print("Constraints:")
    #     print("\t" + str(self.constraints))
