from sympy import Eq, Symbol, symbols, sin
from ..math import t
from .. import Phyo

class Terminal(Phyo):
    def __init__(s, name):
        s.name = name
        s.e, s.i = symbols('%s.e %s.i'%(name,name))

    def attach(s, other):
        return [
            Eq(s.e, other.e),
            Eq(s.i, other.i)
        ]

class Bus(Phyo):
    def __init__(s, name):
        s.T = []
        s.name = name

    def t(s):
        t = Terminal('%s.t%d'%(s.name, len(s.T)))
        s.T.append(t)
        return t

    def eqtns(s):
        eqs = []
        for x in s.T[1:]:
            eqs.append(Eq(s.T[0].i, x.i))
            eqs.append(Eq(s.T[0].e, x.e))
        return eqs

class Gen(Phyo):
    def __init__(s, name, k, ω):
        s.name = name
        s.T = Terminal('%s.t'%name)
        s.λ = Symbol('%s.λ'%name)
        s.k = k
        s.ω = ω
        s.R = None

    def eqtns(s):
        e, i, λ, k, ω = s.T.e, s.T.i, s.λ, s.k, s.ω

        return [
            Eq(e, (λ - k*i)*sin(ω*t))
        ]



class Tline(Phyo):
    def __init__(s, name, R):
        s.name = name
        s.T = [Terminal('%s.t0'%name), Terminal('%s.t1'%name)]
        s.R = R

    def eqtns(s):
        v0, v1, i, R = s.T[0].e, s.T[1].e, s.T[0].i, s.R

        return [
            Eq(v0 - v1, i*R),
            Eq(s.T[0].i, s.T[1].i)
        ]

class Load(Phyo):
    def __init__(s, name, Z):
        s.name = name
        s.T = Terminal('%s.t'%name)
        s.Z = Z

    def eqtns(s):
        v, i, Z = s.T.e, s.T.i, s.Z

        return [
            Eq(v, i*Z)
        ]
