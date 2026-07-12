import pika, time

def send_msg(msg):
    channel.basic_publish(exchange='',
                          routing_key='experiment',
                          body=msg, properties=pika.BasicProperties(content_type='text/plain',
                                                                    delivery_mode=pika.DeliveryMode.Transient),
                          mandatory=True)

credentials = pika.PlainCredentials('dew', 'dew')
connection = pika.BlockingConnection(pika.ConnectionParameters(host="server", credentials=credentials))
channel = connection.channel()
send_msg("init /tmp/script")
stime = time.time() + 5
send_msg("start "+str(stime))



