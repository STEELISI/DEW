import json
import mergexp as mx
from mergexp.net import latency, capacity
from mergexp.unit import ms, mbps, hz
from mergexp.electric import Gen, Bus, Tline, Load
from mergexp.math import π

net = mx.Topology('cps')

g =  net.phyo(Gen,   'g', k=4e-3, ω=60*2*π)
b0 = net.phyo(Bus,   'b0')
b1 = net.phyo(Bus,   'b1')
t =  net.phyo(Tline, 't', R=0.5)
l =  net.phyo(Load,  'l', Z=100)

net.attach(g.T, b0.t())
net.attach(b0.t(), t.T[0])
net.attach(t.T[1], b1.t())
net.attach(b1.t(), l.T)

gc = net.device('gc')
ga = net.actuator('ga', g.λ)
lan = net.connect([gc, ga])
lan[gc].ip.addrs = ['10.0.0.1/24']
lan[ga].ip.addrs = ['10.0.0.2/24']

lc = net.device('lc')
la = net.actuator('la', l.T.i)
lan = net.connect([lc, la])
lan[lc].ip.addrs = ['10.0.0.1/24']
lan[la].ip.addrs = ['10.0.0.2/24']

vm = net.device('vm')
vs = net.sensor('vs', var=b1.T[0].e, rate=hz(100), target='vm')
lan = net.connect([vm, vs])
lan[vm].ip.addrs = ['10.0.0.1/24']
lan[vs].ip.addrs = ['10.0.0.2/24']

wan = net.connect([vm, gc], latency == ms(10), capacity == mbps(30))
wan[vm].ip.addrs = ['1.0.0.1/24']
wan[gc].ip.addrs = ['1.0.0.2/24']

print(json.dumps(net.xir(), indent=2, ensure_ascii=False))
