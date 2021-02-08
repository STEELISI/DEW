#!/usr/bin/python3

import mergexp as mx
import json

net=mx.Topology('multi')
a=net.device('a')
b=net.device('b')
c=net.device('c')

net.connect([a,b])
net.connect([a,c])
print(json.dumps(net.xir(), indent=2))

