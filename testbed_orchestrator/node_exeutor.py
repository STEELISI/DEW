#!/usr/bin/env python
import pika
import os
import subprocess
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host="localhost"))
channel = connection.channel()
channel.queue_declare(queue="rpc_queue")
def run_bash(msg):
    msg = msg[1:-2]
    print("SERVER: msg is ", msg, type(msg))
    #print(msg1, "\n", msg2)
    res = os.system(msg)
    print("SERVER response is :", res)
    #ans = [int(response), str(program_name)]
    return  res
def on_request(ch, method, props, body):
    #print(type(body))
    body = body.decode("utf-8")
    #msg format when  no dependecy found msg = [action_name, actor_name, emitted_keyword, node]
    #msg format when dependency found msg = ["when",action_name, actor_name, emitted_keyword, node, dependency]
    A = list(map(str, body.strip('[]').split(' ')))
    #print(A[0], "\n",A[0]=='when')
    if A[0].find('when') == -1:
        #print("inside if not foudn when")
        action_to_be_executed = A[0].replace("*", " ")
        response = run_bash(action_to_be_executed)
        if (response == 0 ):
            msg_to_put_rq = A[2]
            print("SERVER: msg put in queue is", msg_to_put_rq)
            ch.basic_publish(exchange="", routing_key=props.reply_to, properties=pika.BasicProperties(correlation_id = props.correlation_id), body=str(msg_to_put_rq))
            ch.basic_ack(delivery_tag=method.delivery_tag)
        else:
            msg_to_put_rq = A[2]+"not_executed"
            ch.basic_publish(exchange="", routing_key=props.reply_to, properties=pika.BasicProperties(correlation_id = props.correlation_id), body=str(msg_to_put_rq))
            ch.basic_ack(delivery_tag=method.delivery_tag)
    else:
        #print("inside elsewhen dounf when")
        action_to_be_executed = A[1].replace("*", " ")
        print(A[5][1:-1], action_to_be_executed)
        if body.find(A[5][1:-2]) != -1:
            print("found the dependency ", A[5][1:-1], ", in queue")
            response = run_bash(action_to_be_executed)
            if (response == 0):
                msg_to_put_rq = A[3]
                print("SERVER: msg put in queue is", msg_to_put_rq)
                ch.basic_publish(exchange="", routing_key=props.reply_to,
                                 properties=pika.BasicProperties(correlation_id=props.correlation_id),
                                 body=str(msg_to_put_rq))
                ch.basic_ack(delivery_tag=method.delivery_tag)
        else:
            msg_to_put_rq = A[3] + "not_executed"
            ch.basic_publish(exchange="", routing_key=props.reply_to,
                             properties=pika.BasicProperties(correlation_id=props.correlation_id),
                             body=str(msg_to_put_rq))
            ch.basic_ack(delivery_tag=method.delivery_tag)
        print("it contains when)")
#channel.basic_qos()
channel.basic_consume(queue="rpc_queue", on_message_callback=on_request)
print("SERVER: Awaiting commands to run ")
channel.start_consuming()
