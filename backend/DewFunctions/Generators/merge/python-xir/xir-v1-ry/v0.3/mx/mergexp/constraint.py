from abc import ABC, abstractmethod
from .pb import (
    Uint64Constraint, 
    Uint32Constraint, 
    BoolConstraint,
    GE, 
    EQ
)

class ConstraintObj:
    def __init__(self, constraint=None):
        self.constraint = constraint

    def __eq__(self, value):
        return type(self)(
            constraint = Uint64Constraint(op = EQ, value = value)
        )

    def __ge__(self, value):
        return type(self)(
            constraint = Uint64Constraint(op = GE, value = value)
        )

    @abstractmethod
    def apply(self, target):
        pass

class MemoryCapacity(ConstraintObj):
    def apply(self, target):
        target.spec.memory.capacity.op = self.constraint.op
        target.spec.memory.capacity.value = self.constraint.value

class ProcCores(ConstraintObj):
    def apply(self, target):
        target.spec.proc.cores.op = self.constraint.op
        target.spec.proc.cores.value = self.constraint.value

class DiskCapacity(ConstraintObj):
    def apply(self, target):
        target.spec.disks.capacity.op = self.constraint.op
        target.spec.disks.capacity.value = self.constraint.value

class Metal(ConstraintObj):
    def apply(self, target):
        target.spec.metal.op = self.constraint.op
        target.spec.metal.value = self.constraint.value

class LinkCapacity(ConstraintObj):
    def apply(self, target):
        target.spec.capacity.op = self.constraint.op
        target.spec.capacity.value = self.constraint.value

class Memory:
    def __init__(self):
        self.capacity = MemoryCapacity()

class Proc:
    def __init__(self):
        self.cores = ProcCores()

class Disk:
    def __init__(self):
        self.capacity = DiskCapacity()

class LinkProps:
    def __init__(self):
        self.capacity = LinkCapacity()

memory = Memory()
proc = Proc()
disk = Disk()
link = LinkProps()
metal = Metal()
