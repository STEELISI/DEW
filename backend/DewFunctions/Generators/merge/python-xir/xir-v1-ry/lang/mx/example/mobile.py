import mergexp as mx
import json
from mergexp.stochastic import normal, poisson
from mergexp.unit import gb, ms, mbps
from mergexp.machine import cores, memory, arch, armv7, x86_64
from mergexp.net import capacity, latency
from mergexp.mobile import collision, migration

# define a topology
topo = mx.Topology('hello mobile')

# define a few device types
def mobile(name):
    return topo.device(
        name, 
        cores == 1, 
        memory < gb(2), 
        arch == armv7,
    )

def server(name):
    return topo.device(
        name,
        cores >= 8,
        memory >= gb(8),
        arch == x86_64,
    )

# instantiate devices
mobiles = [mobile('m%d'%i) for i in range(47)]
servers = [server(name) for name in ['s0', 's1']]
nodes = mobiles + servers

# connect devices
net = topo.connect(nodes, 
    latency == normal(mean=ms(5), variance=1.0),
    capacity == normal(mean=mbps(15), variance=0.3),
    collision == poisson(rate=47), 
    migration == poisson(rate=10),
)

print(json.dumps(topo.xir(), indent=2))
