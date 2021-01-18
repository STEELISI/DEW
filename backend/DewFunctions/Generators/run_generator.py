import os.path
import sys
import argparse
import importlib
from bash import BashGenerator
from ns import NSGenerator
import configparser

if __name__ == "__main__":

    argparser = argparse.ArgumentParser(description='Generates scripting and orchestrating from Scenario/Constraints')
    argparser.add_argument('inputFileName', type=argparse.FileType('r'), help="Input file of Scenario and Constraint statements. One line each.")
    argparser.add_argument('generatorType', nargs='?', default="bash", help = "Name of generator to use (e.g. bash)")
    argparser.add_argument('-o', '--outdir', default="/tmp", help="Directory to produce output. If the directory does not exist, this program will attempt to create it.")
    args = argparser.parse_args()

    # We're cheating and using configparser (ConfigParser in 2.x) so we can
    # keep separate sections for Scenario and Constraints
    # XXX We should think about combining constraints with the DEW language.
    # XXX For now, constraints and scenarios each have their own parsers.

    cwd = os.path.dirname(os.path.realpath(__file__))
    parentDirectory = os.path.abspath(os.path.join(cwd, os.pardir))

    hlbFullParser = configparser.ConfigParser(allow_no_value=True)
    hlbFullParser.read_file(args.inputFileName)
    constraints = hlbFullParser.items('Constraints')
    scenario = hlbFullParser.items('Scenario')
    bindings = hlbFullParser.items('Bindings')
    
    generator = BashGenerator.BashGenerator(args.inputFileName, constraints, scenario, bindings)
    generator.generate()
    print(generator.text)

    ns = NSGenerator.NSGenerator(args.inputFileName, constraints, scenario, bindings)
    ns.generate()
    print(ns.text)
    #return generator.evars
