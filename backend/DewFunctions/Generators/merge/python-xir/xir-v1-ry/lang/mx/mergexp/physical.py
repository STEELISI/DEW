import sympy

class Phyo:
    def xir(s):
        return {
            'name': s.name,
            'eqtns': list(map(eqstr, s.eqtns()))
        }

def eqstr(eq):
    s = ""
    if isinstance(eq, str):
        s = eq
    s = str(eq.lhs) + ' = ' + str(eq.rhs)
    return s.replace('**', '^')

def prime(s):
    return "%s'" % s.args[0]

def expo(s):
    return "%s^%s" % (s.args[0], s.args[1])

sympy.Derivative.__str__ = prime
# sympy.Pow.__str__ = expo does not work :/
