from jumpssh import SSHSession, RunCmdError, ConnectionError
from DEWAPI import settings

class SSHConnection():
    def __init__(self,username,password):
        self.username = username
        self.password = password
        self.sshURL = settings.DETERLAB_USER_URL

    def isProjectExists(self,project):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            result['isExists'] = gatewaySession.exists('/proj/' + project)
            gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"
        return result

    def isExperimentExists(self,project,exp):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            result['isExists']=gatewaySession.exists('/proj/' + project + '/exp/' + exp)
            gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"
        return result
    
    def getFileContent(self,project,exp):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            if gatewaySession.exists('/proj/' + project):   
                if gatewaySession.exists('/proj/' + project + '/exp/' + exp):
                    content = gatewaySession.get_cmd_output('cat /proj/' + project + '/exp/' + exp + '/tbdata/' + exp + '.ns')
                    result['content'] = content
                else:
                    result['error'] ='experiment \'' + exp + '\' doesn\'t exists'
            else:
                result['error'] ='project \'' + project + '\' doesn\'t exists'
            
            gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"
        return result

    def createFile(self,gatewaySession,exp,fileContent):
        result = {}
        gatewaySession.file(remote_path='/users/' + self.username + '/' + exp + '.ns', content=fileContent)
        return True
    
    def createExperimentIfNotExistOnDeterLab(self,project,exp,fileContent):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            if not gatewaySession.exists('/proj/' + project):
                result['error'] = "project '" + project + "' doesn't exist"
            try:
                if not gatewaySession.exists('/proj/' + project + '/exp/' + exp):
                    if self.createFile(gatewaySession,exp,fileContent):
                        gatewaySession.get_cmd_output('/usr/testbed/bin/startexp -f -p ' + project + ' -e ' + exp + ' ' + exp + '.ns ')
                
                result['success'] = True
            except RunCmdError as e:
                result['error']= "project '" + project + "' doesn't exist"
            finally:
                gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"
        return result

    def getExperimentStatusInformation(self,project,exp):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            try:
                result['content'] = gatewaySession.get_cmd_output('/usr/testbed/bin/expinfo -a ' + project + ' ' + exp )
            except RunCmdError as e:
                result['error']=e.error
            finally:
                gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"

        return result

    def getActivityLogOfExperiment(self,project,exp):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            try:
                if gatewaySession.exists('/proj/' + project) and gatewaySession.exists('/proj/' + project + '/exp/' + exp):
                    result['content'] = gatewaySession.get_cmd_output('cat /proj/' + project + '/exp/' + exp + '/tbdata/activity.log')
                else:
                    result['error'] = "project or experiment doesn't exist"
            except RunCmdError as e:
                result['error']=e.error
            finally:
                gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"

        return result

    def swap(self,project,exp,mode):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            try:
                if gatewaySession.exists('/proj/' + project) and gatewaySession.exists('/proj/' + project + '/exp/' + exp):
                    gatewaySession.get_cmd_output('/usr/testbed/bin/swapexp ' + project + ' ' + exp + ' ' + mode)
                    result['content'] = 'Successfull'
                else:
                    result['error'] = "project or experiment doesn't exist"
            except RunCmdError as e:
                result['error']=e.error
            finally:
                gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"

        return result
