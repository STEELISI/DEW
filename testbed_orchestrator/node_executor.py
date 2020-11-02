#!/usr/bin/env python
import pika
import os
import subprocess
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host="localhost"))
channel = connection.channel()
channel.queue_declare(queue="rpc_queue")
def run_bash(msg1, program_name):
   # print("SERVER ----------------->",msg1, program_name)
    #msg1 = msg1.encode("utf-8")
   # print("inside run bash, ", msg1, type(msg1))
    # hostname = "google.com"  # example
    print("SERVER: msg is ", msg1)
   # msg1 = msg1.encode("utf-8")
    #print("msg1 is", msg1)
    msg2 = "ping nodeB"
    msg1 = msg1[2:-1]
    #print(msg1, "\n", msg2)
    response = os.system(msg1)
    print("SERVER response is :", response)

    # and then check the response
   # print("server respomse oode is ", int(response))
    #if int(response) == 0 :
        #subprocess.call("/home/kishu/dew/cleanup.sh")
    ans = [int(response), str(program_name)]
    return ans
    # x = os.system(msg1)
    #print("command ran", msg1)
def on_request(ch, method, props, body):
    print(type(body))
    body = body.decode("utf-8")
    A = list(map(str, body.strip('[]').split(',')))
    #print("SERVER A is", A, type(A))
    program_name = A[0]
    command = A[1]
    #print("SERVER body is", body, body[0], body[1])
    msg = command
    print("SERVER : program which requested is ", program_name)
    print("SERVER : command requested by program is,", command)
    # print("running bash" % msg)
    response = run_bash(msg, program_name)

    ch.basic_publish(exchange="", \
                     routing_key=props.reply_to, \
                     properties=pika.BasicProperties(correlation_id = \
                                                         props.correlation_id),
                     body=str(response))
    ch.basic_ack(delivery_tag=method.delivery_tag)
channel.basic_qos()
channel.basic_consume(queue="rpc_queue", on_message_callback=on_request)
print("SERVER: Awaiting commands to run ")
channel.start_consuming()
