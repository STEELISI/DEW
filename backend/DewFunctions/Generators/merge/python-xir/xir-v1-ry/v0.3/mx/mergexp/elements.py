from uuid import uuid4
from functools import reduce
from .pb import Node as PNode
from .pb import Link as PLink
from .pb import Socket as PSocket
from .pb import Endpoint as PEndpoint
from .pb import Network as PNetwork


class Network():
    def __init__(self, name):
        self.id = name
        self.nodes = []
        self.links = []

    def node(self, name, *args):
        n = Node(name, *args)
        self.nodes.append(n)
        return n

    def connect(self, nodes, *args):
        sockets = [x.socket() for x in nodes]
        l = Link(sockets, *args)
        self.links.append(l)
        return l

    def xir(self):
        n = PNetwork(id=self.id)
        for x in self.nodes:
            n.nodes.append(x.xir())
        for x in self.links:
            n.links.append(x.xir())
        return n


class Socket:
    def __init__(self, parent, index):
        self.parent = parent
        self.index = index
        self.endpoint = None
        self.addrs = []

    def str(self):
        return "%s.%d"%(self.parent.spec.id, self.index)

class Endpoint:
    def __init__(self, parent, index):
        self.parent = parent
        self.index = index
        self.socket = None

class Node():
    def __init__(self, name, *args):
        self.spec = PNode(id=name)
        self.sockets = []
        for constraint in args:
            constraint.apply(self)

    def socket(self):
        s = Socket(parent=self, index=len(self.sockets))
        self.sockets.append(s)
        return s

    def xir(self):
        del self.spec.sockets[:]
        for s in self.sockets:
            ps = PSocket(index=s.index)
            if s.endpoint:
                ps.endpoint.element = s.endpoint.parent.spec.id
                ps.endpoint.index = s.endpoint.index
                for a in s.addrs:
                    ps.addrs.append(a)
            self.spec.sockets.append(ps)
        return self.spec

class Link():
    def __init__(self, sockets, *args):
        self.endpoints = []
        self.spec = PLink()
        self.spec.id = str(
            reduce(lambda x,y: x + "~" + y, map(lambda x: x.str(), sockets))
        )
        for _ in sockets:
            self.endpoints.append(
                Endpoint(parent=self, index=len(self.endpoints))
            )

        for (s,e) in zip(sockets, self.endpoints):
            s.endpoint = e
            e.socket = s

        for constraint in args:
            constraint.apply(self)

    # TODO: our model assumes that nodes are only connecte to the same network
    # once.
    def __getitem__(self, x):
        for e in self.endpoints:
            if e.socket.parent.spec.id == x.spec.id:
                return e
        raise IndexError()

    def xir(self):
        x = self.spec
        del self.spec.endpoints[:]
        for e in self.endpoints:
            pe = PEndpoint(index=e.index)
            if e.socket:
                pe.socket.element = e.socket.parent.spec.id
                pe.socket.index = e.socket.index
            x.endpoints.append(pe)
        return x

__xp = {}
def experiment(topo):
    global __xp
    __xp['topo'] = topo
