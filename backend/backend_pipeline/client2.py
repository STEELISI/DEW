#!/usr/bin/env python
import pika
import uuid

class RpcClient(object):

    def __init__(self):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='localhost'))

        self.channel = self.connection.channel()

        result = self.channel.queue_declare(queue='', exclusive=True)
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
            exchange='',
            routing_key='rpc_queue',
            properties=pika.BasicProperties(
                reply_to=self.callback_queue,
                correlation_id=self.corr_id,
            ),
            body=str(n))
        while self.response is None:
            self.connection.process_data_events()
        return int(self.response)


test_rpc = RpcClient()

print("Requesting bash command")
f = open("dew2.txt","r")
lines = f.read().split("then \n")
# print(lines)
commands = []
for command in lines:
    y = command.strip().split(" ")
    # print(y)
    x = y[2] + " "+ y[3]
    # print(x)
    commands.append(x)


# print(lines)

# command1 = lines[1]
#
# command2 = lines[3]
# list_commands =
# print(commands[0])
# response = test_rpc.call(commands[0])
# print(commands[0], " executed ")
#
for c in commands:
    print("trying", c)
    response = test_rpc.call(c)
    # print("response is ", response)
    if response == 0:
    # response = test_rpc.call(command2)
        print(c, " executed ")
        continue
    else:
        print(c, "not executed")
        # break