#!/usr/bin/env python
import pika
import os
import subprocess

'''
Node executor process executes the action which are present in the queue.
Once an action is performed the process will emit the appropiate response.
'''

#make connection object and define the queue.

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host="localhost"))
channel = connection.channel()
channel.queue_declare(queue="rpc_queue")


def run_bash(msg):
    '''
    This function will execute action provided in the argument.
    :param msg: the action to be executed.
    :return: the response after executing any action, whether it succeeded or not
    '''
    #get message into appropaite format, strip extra spaces.
    msg = msg[1:-2]
    res = os.system(msg)
    print("SERVER response is :", res)
    return  res


def on_request(ch, method, props, body):
    '''
    It is a callback function, invoked when a message is retrieved from the queue.
    :param ch: the connection object
    :param method: the method defined when initalizing the queue
    :param props: properties of the queue
    :param body: actual message from the queue
    :return: doesnt return anything
    '''
    body = body.decode("utf-8")

    '''
    For now, the actions can have dependency or not. Dependency means, if the current action needs to be executed only it dependent 
    action is executed. 
    
    To incorporate this the message has 2 formats
    1) #msg format when  no dependency found msg = [action_name, actor_name, emitted_keyword, node]
    2) #msg format when dependency found msg = ["when",action_name, actor_name, emitted_keyword, node, dependency]
    '''
    A = list(map(str, body.strip('[]').split(' ')))

    #when there is no dependency we execute the action and the response.
    if A[0].find('when') == -1:
        action_to_be_executed = A[0].replace("*", " ")
        response = run_bash(action_to_be_executed)
        # if the action got succeefully executed put the response in the queue
        if (response == 0 ):
            msg_to_put_rq = A[2]
            print("SERVER: msg put in queue is", msg_to_put_rq)
            ch.basic_publish(exchange="", routing_key=props.reply_to, properties=pika.BasicProperties(correlation_id = props.correlation_id), body=str(msg_to_put_rq))
            ch.basic_ack(delivery_tag=method.delivery_tag)
        #when the action to be executed is not successful
        else:
            msg_to_put_rq = A[2]+"not_executed"
            ch.basic_publish(exchange="", routing_key=props.reply_to, properties=pika.BasicProperties(correlation_id = props.correlation_id), body=str(msg_to_put_rq))
            ch.basic_ack(delivery_tag=method.delivery_tag)
    # case when there is a dependency
    else:
        #split the command(action) basis on splitter
        action_to_be_executed = A[1].replace("*", " ")
        # print(A[5][1:-1], action_to_be_executed)
        #check for the dependency in the message, which action needs to be executed before the current action
        #if the dependent action is already executed then execute the current action
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
        #if the dependent action is not done then we cant execute the current action
        else:
            msg_to_put_rq = A[3] + "waiting_for_dependency_to_be_executed"
            ch.basic_publish(exchange="", routing_key=props.reply_to,
                             properties=pika.BasicProperties(correlation_id=props.correlation_id),
                             body=str(msg_to_put_rq))
            ch.basic_ack(delivery_tag=method.delivery_tag)
        # print("it contains when)")

channel.basic_qos()

'''
start consuming from queue
and invoke the call back function
'''
channel.basic_consume(queue="rpc_queue", on_message_callback=on_request)
print("SERVER: Awaiting commands to run ")
channel.start_consuming()
