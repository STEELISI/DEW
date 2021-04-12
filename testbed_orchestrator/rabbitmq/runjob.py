#!/usr/bin/env python
import pika, sys, os
import socket, re
import sqlite3
import collections
import subprocess
from os import walk

children={}

# build a list of parent/child jobs
def pstree():
    global children
    tomatch = re.compile("^\d+$")
    files=os.listdir("/proc")
    
    tree=collections.defaultdict(dict)
    children={}
    for f in files:
        if (tomatch.match(f)):
            with open("/proc/"+f+"/stat") as myfile:
                lines = myfile.readlines()
                items = lines[0].split(' ')
                pid = items[0]
                cmd = items[1]
                i = 2
                if cmd.startswith("("):
                    while not cmd.endswith(")"):
                        cmd = cmd + " " + items[i]
                        i += 1
                state = items[i]
                i += 1
                ppid = items[i]
                tree[pid]['cmd'] = cmd
                tree[pid]['state'] = state
                tree[pid]['parent'] = ppid
                if ppid in children:
                    children[ppid].append(pid)
                else:
                    children[ppid] = [pid]
                    
        for ppid in children:
            print("Children of ", ppid, " are ", children[ppid])

def callback(ch, method, properties, body):
    global children
    received_data = body.decode()
    print(" [x] Received msg %r" % body.decode())
    elems = received_data.split()
    if (len(elems) != 3):
        return
    cmd = elems[0]
    script = elems[1]
    num = elems[2]
    if (cmd != "start" and  cmd != "stop"):
        return

    if cmd == "start":
        childpid = os.fork()
        if childpid == 0:
             subprocess.Popen(['/bin/bash', '-c', script])
        else:
            con = sqlite3.connect('/tmp/dew.db')
            cur = con.cursor()
            statement = "insert into processes values (" + str(childpid)+",\""+script+"\","+str(num)+")"
            print(statement)
            cur.execute(statement)
            con.commit()
            con.close()#	print "Got child pid $childpid\n";
    elif cmd == 'stop':
        pstree()
        con = sqlite3.connect('/tmp/dew.db')
        cur = con.cursor()
        statement = "select pid from processes where cmd=\""+script+"\" and num="+str(num)
        print(statement)
        for ppid in children:
            print("outside Children of ", ppid, " are ", children[ppid])
        for row in cur.execute(statement):
            pid = str(row[0])
            print("Got pid from DB ", pid, " its children ", children[pid])
            if pid in children:
                print("Children has pid ", pid)
                for c in children[pid]:
                    print("Should kill child ", c)
                    pass #recursivekill(c)
            print("Should kill ", pid) #os.kill(pid,9)
        con.commit()
        con.close()#
#	if (exists($childpids{$script . "-" . $num}))
#	{
#	    my $pid =  $childpids{$script . "-" . $num};
#	    if(exists($children{$pid}))
#	    {		
#		for $c (@{$children{$pid}})
#		{
#		    recursivekill($c);
#		}
#		#kill HUP, $pid;
#		# should do this recursively
#		$children{$pid} = "";
#	    }
#	    system("rm $script");
#	}
#	else
#	{
#	    print("No active script $script\n");
#	    clean($script, $num);
#	}

    return

    
def main():
    hostname = socket.gethostname().split('.')
    myname = hostname[0]

    credentials = pika.PlainCredentials('dew', 'dew')
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=myname, credentials=credentials))
    channel = connection.channel()
    channel.queue_declare(queue='experiment')

    channel.basic_consume(queue='experiment', on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
