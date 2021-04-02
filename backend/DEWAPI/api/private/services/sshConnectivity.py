from jumpssh import SSHSession, RunCmdError, ConnectionError
from DEWAPI import settings
import uuid
import time

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

    def createFile(self,gatewaySession,filename,fileContent):
        result = {}
        gatewaySession.file(remote_path='/users/' + self.username + '/' + filename, content=fileContent)
        return True
    
    def createExperimentIfNotExistOnDeterLab(self,project,exp,fileContent):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            if not gatewaySession.exists('/proj/' + project):
                result['error'] = "project '" + project + "' doesn't exist"
            try:
                if not gatewaySession.exists('/proj/' + project + '/exp/' + exp):
                    filename = exp + str(uuid.uuid4())  + '.ns'
                    if self.createFile(gatewaySession,filename,fileContent):
                        gatewaySession.get_cmd_output('/usr/testbed/bin/startexp -f -i -p ' + project + ' -e ' + exp + ' ' + filename)
                
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
                    result['content'] = 'Successful'
                else:
                    result['error'] = "project or experiment doesn't exist"
            except RunCmdError as e:
                result['error']=e.error
            finally:
                gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"

        return result

    def updateProjectNsfile(self,project,exp,fileContent):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            if not gatewaySession.exists('/proj/' + project):
                result['error'] = "project '" + project + "' doesn't exist"
            try:
                if gatewaySession.exists('/proj/' + project + '/exp/' + exp):
                    filename = exp + str(uuid.uuid4())  + '.ns'
                    if self.createFile(gatewaySession,filename,fileContent):
                        gatewaySession.get_cmd_output('/usr/testbed/bin/modexp ' + project + ' ' + exp + ' ' + filename)
                        result['success'] = True
                    else:
                        result['error']= "unable to upload file to server."
                else:
                    result['error']= "experiment '" + exp + "' doesn't exist"
            except RunCmdError as e:
                result['error']= "project '" + project + "' doesn't exist"
            finally:
                gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"
        return result

    def runFile(self,project,exp,fileContent,variables, unique_name, action):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            if not gatewaySession.exists('/proj/' + project):
                result['error'] = "project '" + project + "' doesn't exist"
                return result
            if not gatewaySession.exists('/proj/' + project + '/exp/' + exp):
                result['error']= "experiment '" + exp + "' doesn't exist"
                return result
            status_log = gatewaySession.get_cmd_output('/usr/testbed/bin/expinfo -a ' + project + ' ' + exp )
            if 'State: swapped' in status_log:
                result['error']= "experiment '" + exp + "' is not active."
                return result     
            if 'No information available.' in status_log:
                result['error']= "experiment '" + exp + "' is in transition."
                return result 
            try:
                unique_name = exp + '_run'
                filename = unique_name + ".sh"
                print("Unique name ", unique_name, " file name ", filename, " action ", action)    
                if self.createFile(gatewaySession,filename,fileContent):
                    print("Created file")
                    labels = ''
                    for label in variables:
                        labels += ' \'' + str(label) + '\''
                        
                    cmd = '/share/shared/dew/manager /users/' + self.username + '/' + filename + ' ' + project + ' ' + exp + ' ' + unique_name + labels + ' ' + action \
                        + '>' + unique_name + '.log' 
                    
                    print(cmd)
                    try:
                        gatewaySession.get_cmd_output(cmd)
                    except RunCmdError as e:
                        print(e)
                        result['command_status_message']= "command executed with exception"
                    result['success'] = True
                    result['filename'] = unique_name
                else:
                    print("Could not create file")
                    result['error']= "unable to upload file to server."
            except RunCmdError as e:
                # print(e)
                result['error']= "project '" + project + "' doesn't exist"
            finally:
                gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"
        
        return result

    
    def cleanFile(self,project,exp,fileContent):
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            if not gatewaySession.exists('/proj/' + project):
                result['error'] = "project '" + project + "' doesn't exist"
                return result
            if not gatewaySession.exists('/proj/' + project + '/exp/' + exp):
                result['error']= "experiment '" + exp + "' doesn't exist"
                return result
            # status_log = gatewaySession.get_cmd_output('/usr/testbed/bin/expinfo -a ' + project + ' ' + exp )
            # if 'State: swapped' in status_log:
            #     result['error']= "experiment '" + exp + "' is not active."
            #     return result     
            # if 'No information available.' in status_log:
            #     result['error']= "experiment '" + exp + "' is in transition."
            #     return result 
            try:
                unique_name = exp + '_cleanup'# + str(uuid.uuid4())
                filename = unique_name + ".sh"
                if self.createFile(gatewaySession,filename,fileContent):
                    
                    cmd = 'nohup bash /users/' + self.username + '/' + filename+ ' > ' + unique_name + '.log '
                    print(cmd)
                    try:
                        s2 = gatewaySession.get_cmd_output(cmd)
                    except RunCmdError as e:
                        result['command_status_message']= "command executed with exception"
                    result['success'] = True
                    result['filename'] = unique_name
                else:
                    result['error']= "unable to upload file to server."    
            except RunCmdError as e:
                # print(e)
                result['error']= "project '" + project + "' doesn't exist"
            finally:
                gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"
        
        return result
    
    def getRunFile(self, unique_name, s, b):
        
        result = {}
        try:
            gatewaySession = SSHSession(self.sshURL, self.username, password=self.password).open()
            directory  = '/users/' + self.username + "/DEW"
            print("Getting logs for "+directory+"/"+unique_name);

            try:
                if not gatewaySession.exists(directory) or not gatewaySession.exists(directory+ "/" + unique_name):
                    result['error'] = "No run information available."
                    return result
                results = []
                directory = directory+ "/" + unique_name
                cmd = "/share/shared/dew/jobstatus " + unique_name
                output = gatewaySession.get_cmd_output(cmd)
                print("Found ",output)
                lines = output.split("\n")
                for l in lines:
                    r={}
                    #$id, $tasks{$id}{'node'}, $tasks{$id}{'action'}, $tasks{$id}{'cmd'}, $tasks{$id}{'ran'}, $tasks{$id}{'status'}, $tasks{$id}{'error'}
                    elems = l.split(",")
                    print("Line ",l," elems ",len(elems))
                    r['node'] = elems[2]
                    r['action'] = elems[1]
                    r['script'] = elems[3]
                    r['started'] = elems[4]
                    if elems[5].strip() != "":
                        r['status'] = str(int(elems[5]))
                    else:
                        r['status'] = 0
                    if len(elems) == 7:
                        r['error'] = 'blah' #elems[6]
                    else:
                        r['error'] = 'truc'
                    print("Status for ",r['node']," action ", r['action'], " is ", r['status'])
                    results.append(r)
                    
                result['data'] = results
                result['startIndex'] = 0
                result['batchSize'] = len(lines)
                result['totalFiles'] = len(lines)
                  
            except RunCmdError as e:
                result['error']= "command executed with exception"
            finally:
                gatewaySession.close()
        except ConnectionError as e:
            result['error'] = "Unable to connect to 'deterlab' with user '" + self.username + "'"
        
        return result

