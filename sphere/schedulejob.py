#!/usr/bin/env python
import pika, sys, os
import socket, re, json
import sqlite3
import signal
import collections
import subprocess
import time
import threading
from os.path import exists

    
myscript={}
children={}
spawned={}
started=False
starttime=0
folder=""
myname=None

def init_script(script):
    global myscript
    global myname
    
    # Load from a file
    with open(script, "rb") as f:
        content = f.read()
        data = json.loads(content)
        f.close()
        
    cid=0
    
    for key,val in data['Scenario'].items():
        items = val.split(' ')
        pos = 0
        trigger=None
        event=None
        print(items)
        if items[0] == 'when':
            trigger=items[1]
            pos = 2
        if items[pos] != myname:
            print("Command", val, "ignoring since not for me")
            continue
        else:
             myscript[cid] = {}
             myscript[cid]['done'] = False
             myscript[cid]['when'] = []
             myscript[cid]['tell'] = {}
             myscript[cid]['wait'] = 0
             myscript[cid]['actor'] = myname
             myscript[cid]['action'] = data['Bindings'][items[pos+1]]
             #deal with emit
             print(myscript[cid])
             cid += 1
        continue
    return
    todelete=[]
    for cid, val in myscript.items():    
        print("Command ", cid, " when ")
        for cond in myscript[cid]['when']:
            print(cond)
        print(" actor ", myscript[cid]['actor'], " action ", myscript[cid]['action'], " tell ")
        for rec, mess in myscript[cid]['tell'].items():
            print(rec, mess)
        print("\n\n")
                    
        
def recursivekill(pid):
    global children
    
    if pid in children:
        for c in children[pid]:
            recursivekill(c)

    try:
        os.kill(int(pid),signal.SIGABRT)
    except:
        pass
        

    
# build a list of parent/child jobs
def pstree():
    global children
    tomatch = re.compile("^\d+$")
    files=os.listdir("/proc")
    
    children={}
    for f in files:
        if (tomatch.match(f)):
            try:
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
                    if ppid in children:
                        children[ppid].append(pid)
                    else:
                        children[ppid] = [pid]
            except FileNotFoundError:
                pass

def run_cmd(script, num):    
    print("Starting  ", script)
    f = open("/tmp/runjob.log", "a") 
    epoch=time.time()
    timenow=time.strftime("%d %b %Y %H:%M:%S", time.localtime(epoch)) 
    f.write(timenow + " started child /bin/bash %s\n" % script)
    f.close()
    process = subprocess.run(script.split())
    print("Opened process, returncode ", process.returncode, " stdout ", process.stdout, " stderr ", process.stderr)
    return
            
def cb(ch, method, properties, body):
    global connection
    if callback is not None:
        t = threading.Thread(target=callback, args=(ch, method, properties, body))
        t.daemon = True
        t.start()
        
def callback(ch, method, properties, body):
    global children
    global starttime
    global folder
    
    received_data = body.decode()
        
    f = open("/tmp/schedulejob.log", "a") 
    epoch=time.time()
    timenow=time.strftime("%d %b %Y %H:%M:%S", time.localtime(epoch)) 
    f.write(timenow + " received %r\n" % body.decode())
    print(" [x] Received msg %r" % body.decode())
    f.close()
    
    elems = received_data.split()
    
    cmd = elems[0]
    if (cmd == "init"):
        init_script(elems[1])
        return

    if (cmd == "start"):
        starttime = int(float(elems[1]))
        return

    if cmd == 'stop':
        pstree()
        con = sqlite3.connect('/tmp/dew.db')
        cur = con.cursor()
        if (script != "all" and num != "all"):
            statement = "select pid from processes where cmd=\""+script+"\" and num="+str(num)
        else:
            statement = "select pid from processes\n"
        print(statement)

        for row in cur.execute(statement):
            pid = str(row[0])
            print("Got pid from DB ", pid)

            if pid in children:
                print("Children has pid ", pid)
                for c in children[pid]:
                    print("Should kill child ", c)
                    recursivekill(c)
            print("Should kill ", pid)
            delpid = pid
            try:
                os.kill(int(pid),signal.SIGABRT)
                del pid
                os.wait()
                #subprocess.call(["kill", "-9", pid])
            except:
                print("Error ", sys.exc_info()[0])
                pass

            statementd = "delete from processes where pid="+delpid
            cud = con.cursor()
            cud.execute(statementd)
        con.commit()
        con.close()#
    return

def check_events():
    global myscript
    global started
    global starttime
    global folder

    while True:

        if not started and starttime != 0:
            if time.time() >= starttime:
                started = True
                print("Starting now, time ", time.time())
                
        if started == False:
            continue

        donecids=[]
        for cid, val in myscript.items():
            todelete=[]
            if len(myscript[cid]['when']) == 0 and myscript[cid]['done'] == False:
                cmd=  myscript[cid]['action']
                t = threading.Thread(target=run_cmd, args=(cmd, cid))
                t.daemon = True
                t.start()
                # insert into DB here
                myscript[cid]['done'] = True
                    
            for rec, mess in myscript[cid]['tell'].items():
                if (mess == "psuccess"):
                    filename = folder + "/status." + str(cid)
                    file_exists = exists(filename)
                    print("File exists ", filename, file_exists)
                    if (file_exists):
                        with open(filename) as myfile:
                            lines = myfile.readlines()
                            myfile.close()
                            for l in lines:
                                if int(l) == 0:
                                    print("Will tell psuccess-"+str(cid)+" to "+rec)
                                    todelete.append(rec)
                                    continue
                print("Command ", cid, " waiting to tell ", rec, " about ", mess)
            for rec in todelete:
                del(myscript[cid]['tell'][rec])
                
        # Delete commands that are done            
        time.sleep(0.1)

        
def main():

    global connection
    global myname
    
    hostname = socket.gethostname().split('.')
    myname = hostname[0]

    t = threading.Thread(target=check_events, args=())
    t.daemon = True
    t.start()
        
    credentials = pika.PlainCredentials('dew', 'dew')
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=myname, credentials=credentials))
    channel = connection.channel()
    channel.queue_declare(queue='experiment')
    channel.basic_consume(queue='experiment', on_message_callback=cb, auto_ack=True)

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
