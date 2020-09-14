#!/usr/bin/env python
from  subprocess import call
l = ["actor0 run1", "actor1 run1"]
#x = h.parse_with_labels(l)

for s in l:
    file_name = s.split(" ")[0]
    print(file_name)
    var1 = file_name
    call(['bash', 'create_pipeline.sh', str(var1)])