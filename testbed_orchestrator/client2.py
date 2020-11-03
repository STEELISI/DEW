#!/usr/bin/env python
import pika
import uuid, os, sys
import subprocess
from  subprocess import call

class RpcClient(object):

    def __init__(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host="localhost"))

        self.channel = self.connection.channel()

        result = self.channel.queue_declare(queue="", exclusive=True)
        self.callback_queue = result.method.queue

        self.channel.basic_consume(
            queue=self.callback_queue,
            on_message_callback=self.on_response,
            auto_ack=True)

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def call(self, n):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        self.channel.basic_publish(
            exchange="",
            routing_key="rpc_queue",
            properties=pika.BasicProperties(
                reply_to=self.callback_queue,
                correlation_id=self.corr_id,
            ),
            body=str(n))
        while self.response is None:
            self.connection.process_data_events()
        return self.response


test_rpc = RpcClient()
program_name  = os.path.basename(sys.argv[0])
print("CLIENT : Requesting bash command")
l = ["actor0,touch 0.txt", "actor1,touch 1.txt", "actor2,ping -c 1 nodeB"]
#x = h.parse_with_labels(l)
#print("hi")
for s in l:
    actor_name = s.split(",")[0]
    action_name = s.split(",")[1]
    #print(actor_name)
    #print(action_name)
    var1 = actor_name
    var2 = action_name
    print("CLIENT : actor requesting", var1)
    print("CLIENT : action requesting", var2)
   # subprocess.check_call(["/home/kishu/dew/create_pipeline.sh", var1, var2])
    command =  action_name
    #ifile = "/home/kishu/dew/"+var2+".sh"
    #print(ifile)
    #line = open(ifile, "r")
    #print("action to be executed is", line.readline())
    print("CLIENT : command is ", command)
    msg = [program_name, command]
    print("CLIENT :  msg IS", msg)
    res = test_rpc.call(msg)
    res = res.decode("utf-8")
    A = list(map(str, res.strip('[]').split(',')))
    print("CLIENT : A is", A, type(A))
    response = int(A[0])
    p_name = A[1]
    print("CLIENT RECEIVED : response is", response)
    print("CLIENT RECEIVED : programe name is", p_name)

    if response == 0:
        print("CLIENT : suucessfully executed command", command, "for program :", p_name)
        #print("now need to write the clean up script")
        #subprocess.call("/home/kishu/dew/cleanup.sh")
       # os.system("sudo rm /etc/monit/ac*")
       # print("returned after clean up")
    else:
        print("CLIENT : didnt execute the command", command)
