#!/usr/bin/env python
import pika
import os
import subprocess
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host="localhost"))
channel = connection.channel()
channel.queue_declare(queue="rpc_queue")

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
    # test_rpc.call(msg)
    print("CLIENT: msg added to queue ")
    channel.basic_publish(exchange = "fanout",body= str(msg),routing_key="rpc_queue")
print("CLIENT : Client sent everything to queue ")
connection.close()
#print("CLIENT: now we need to wait for the commands to be executed")
#def on_request(ch, method, props, body):
#    print("trying to fetch message in client")
#    msg = body
#    print("CLIENT: msg received from queue is", msg)
#    ch.basic_ack(delivery_tag=method.delivery_tag)
#channel.basic_qos()
#connection = pika.BlockingConnection(
#    pika.ConnectionParameters(host="localhost"))
#channel = connection.channel()
#channel.queue_declare(queue="rpc_queue")
#channel.basic_consume(queue="rpc_queue", on_message_callback=on_request)
#print("CLIENT: Searching for commands in queue ")
#channel.start_consuming()
# channel.start_consuming()

