import mergexp as mx
from json import dumps

net = mx.Topology('two')
a = net.device('a')
b = net.device('b')
ab = net.connect([a, b])

ab[a].ip.addrs = ['10.0.0.1/24']
ab[b].ip.addrs = ['10.0.0.2/24']

print(dumps(net.xir(), indent=2))
