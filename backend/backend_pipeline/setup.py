from subprocess import call
import os
rc = call("./setup.sh")



bashCommand = "sudo apt-get update -y"
os.system(bashCommand)


bashCommand2 = "sudo apt-get install -y rabbitmq-server"
os.system(bashCommand2)

bashCommand3 = "sudo apt-get install monit"
os.system(bashCommand3)
