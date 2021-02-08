import mergexp as mx
import json
from mergexp.unit import gb, ms, mbps
from mergexp.machine import cores, memory
from mergexp.net import capacity, latency

# define a topology
topo = mx.Topology('hello mx')

# make some devices
a = topo.device('a', cores > 2, memory <= gb(4))
b = topo.device('b', cores < 6, memory >= gb(4))

# connect devices
topo.connect([a, b], capacity < mbps(100), latency > ms(5))

print(json.dumps(topo.xir(), indent=2))

