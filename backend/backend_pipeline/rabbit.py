'''

process A starts on client, when it is started B starts on server

run RabbitMQ on client and server
have "A.1" and "B.2" files somewhere on client and server
A.1 has "client A emit astarted"
B.2 has "when astarted server B"
have python process on A read A.1 from the queue
have monit on A monitor for A starting
when we want to start send a message to the queue that says "start"
everyone reads it and A starts because it is not waiting for anything
monit detects this and sends astarted
have python process on B read B.2 and then keep reading from the queue
B reads astarted from queue and triggers B

'''


import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='hello')
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")
connection.close()
