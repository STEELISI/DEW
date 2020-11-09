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
l = ["A touch nodeA.txt emit pdone1" ,"B when pdone1 touch nodeB.txt emit pdone2 "]
#x = h.parse_with_labels(l)
#print("hi")
for s in l:
    node = s.split(" ")[0]
    # print(s.find("when"),"\n")
    if (s.find("when") != -1):
        # print("in true",s,"\n")
        actor_name = s.split(" ")[3]+node
        action_name = s.split(" ")[3]+"*"+s.split(" ")[4]
        emitted_keyword = s.split(" ")[6]
        dependency = s.split(" ")[2]
        msg = ["when", action_name, actor_name, emitted_keyword, node, dependency]
    else:
        # print("in else")
        actor_name = s.split(" ")[1]+node
        action_name = s.split(" ")[1]+"*" +s.split(" ")[2]
        emitted_keyword = s.split(" ")[4]
        msg = [action_name, actor_name, emitted_keyword, node]
    print("CLIENT : sending message to node executor", msg)
    test_rpc.call(msg)
    print("CLIENT: msg added to queue ")
    #
    # res = res.decode("utf-8")
    # A = list(map(str, res.strip('[]').split(',')))
    # print("CLIENT : A is", A, type(A))
    # response = int(A[0])
    # p_name = A[1]
    # print("CLIENT RECEIVED : response is", response)
    # print("CLIENT RECEIVED : programe name is", p_name)
    #
    # if response == 0:
    #     print("CLIENT : suucessfully executed command", action_name, "for program :", p_name)
    #     #print("now need to write the clean up script")
    #     #subprocess.call("/home/kishu/dew/cleanup.sh")
    #    # os.system("sudo rm /etc/monit/ac*")
    #    # print("returned after clean up")
    # else:
    #     print("CLIENT : didnt execute the command", command)

