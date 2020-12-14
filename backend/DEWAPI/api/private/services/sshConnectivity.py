from jumpssh import SSHSession
from DEWAPI import settings

class SSHConnection():
    def __init__(self,username,password):
        self.username = username
        self.password = password
        self.sshURL = settings.DETERLAB_USER_URL

    def isProjectExists(self,project):
        gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
        result = {'isExists':gatewaySession.exists('/proj/' + project)}
        gatewaySession.close()
        return result

    def isExperimentExists(self,project,exp):
        gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
        result = {'isExists':gatewaySession.exists('/proj/' + project + '/exp/' + exp)}
        gatewaySession.close()
        return result
    
    def getFileContent(self,project,exp):
        gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
        if gatewaySession.exists('/proj/' + project):   
            if gatewaySession.exists('/proj/' + project + '/exp/' + exp):
                content = gatewaySession.get_cmd_output('cat /proj/' + project + '/exp/' + exp + '/tbdata/' + exp + '.ns')
                result = {'content':content}
            else:
                result = {'error':'experiment \'' + exp + '\' doesn\'t exists'}
        else:
            result = {'error':'project \'' + project + '\' doesn\'t exists'}
        
        gatewaySession.close()

        return result
