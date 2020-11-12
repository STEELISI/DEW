#!/usr/bin/env python
import pika
#Make the connection and declare the queue
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host="localhost"))
channel = connection.channel()
channel.queue_declare(queue="rpc_queue")

'''
the following part requires changes
need to read a dew file, use HLB parser to parse it
and form the message into the following pattern
To incorporate this the message has 2 formats
    1) #msg format when  no dependency found msg = [action_name, actor_name, emitted_keyword, node]
    2) #msg format when dependency found msg = ["when",action_name, actor_name, emitted_keyword, node, dependency]

'''

l = ["A touch nodeA.txt emit pdone1" ,"B when pdone1 touch nodeB.txt emit pdone2 "]

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

