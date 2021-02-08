"""
    Example code showing storage features
"""

import json
import mergexp
from mergexp.unit import gb, tb

# define a topology
topo = mergexp.Topology('hello mx')

# make some devices
devA = topo.device('a')
devB = topo.device('b')

fsX = mergexp.Storage(kind="fs", size=gb(20), name="testFS")
blockY = mergexp.Storage(kind="block", size=tb(1), name="testBS")
fsZ = mergexp.Storage(kind="fs", size=gb(10), name="mergeFS")

devA.mount("/mnt/test", fsX)
devB.mount("/dev/vdc", blockY)
devB.mount("/mnt/merge", fsZ)

# connect devices
topo.connect([devA, devB])

with open('test.xir', 'w') as outfile:
    json.dump(topo.xir(), outfile)
