import os

class Logger(object):
    def log(user, message):
        message = message + "\n"
        path = "/var/log/DEW/" + user + "/"
        if (not os.path.exists(path)):
            os.makedirs(path)
        path = path + "frontend_logs.log"
        file = open(path, "a")  # append mode
        file.write(message)
        file.close()
        pass