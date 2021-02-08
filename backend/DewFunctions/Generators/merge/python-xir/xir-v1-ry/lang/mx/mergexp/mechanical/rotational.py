from sympy import Eq, Symbol, Derivative
from ..math import t
from .. import Phyo

class Rotor(Phyo):
    def __init__(s, name, H):
        s.name = name
        s.H = H
        s.ω = Symbol('%s.ω'%name)
        s.τ = Symbol('%s.τ'%name)
        s.θ = Symbol('%s.θ'%name)

    def eqtns(s):

        ω, τ, θ, H, t = s.ω, s.τ, s.θ, s.H, Symbol('t')

        return [
            Eq(Derivative(ω, t), τ - H*ω**2),   # ω' = τ - H*ω^2
            Eq(Derivative(s.θ, t), ω)           # θ' = ω
        ]
