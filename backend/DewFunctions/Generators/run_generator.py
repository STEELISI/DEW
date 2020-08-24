import os.path
import sys
import configparser
import argparse

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
    hlbFullParser = configparser.ConfigParser(allow_no_value=True)
    hlbFullParser.read_file(args.inputFileName)
    constraints = [x[0] for x in hlbFullParser.items('Constraints')]
    scenarios = [x[0] for x in hlbFullParser.items('Scenario')]
    bindings = [x[0] for x in hlbFullParser.items('Bindings')]

    cwd = os.path.dirname(os.path.realpath(__file__))
    parentDirectory = os.path.abspath(os.path.join(cwd, os.pardir))
    if os.path.isdir(cwd + "/" + args.generatorType) and os.path.isfile(cwd + "/" + args.generatorType + '/' + args.generatorType + '.py'):
        sys.path.append(cwd + "/" + args.generatorType)
        # sys.path.append(cwd + "\\" + args.generatorType)
    else:
        print("\nERROR:\tExpecting generator type (%s) to match {generator}/{generator}.py\n\t(e.g. %s/%s.py) in %s/ directory.\n\n" %(args.generatorType, args.generatorType, args.generatorType, cwd))
        argparser.print_help()
        print("\n")
        exit(1)

    chosenGenerator = __import__(args.generatorType, fromlist=['Generator'])
    generator = chosenGenerator.Generator(scenarios, constraints=constraints)
    [t, y] = generator.generate()
    nsScript, clientServerList = generator.generateNS(y, scenarios, None)
    print(nsScript)
    bashScript = generator.generateBASH(scenarios, bindings, clientServerList)
    print(bashScript)
