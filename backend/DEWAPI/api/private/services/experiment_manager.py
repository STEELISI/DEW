from extensions import db
from DEWAPI.models.user import User
from DEWAPI.models.experiment import Experiment
from DEWAPI.models.drive_table import DriveTable
from DEWAPI.models.access_control import AccessControl
from utilities.access_control_enum import AccessControlEnum
from datetime import datetime
from dateutil.relativedelta import relativedelta
from .hlbServices import HLBService
import requests
import json
import configparser
import io


class ExperimentManager(object):
    def create_experiment(self, userId, experiment, id, name, description):
        # try:
        u = User.query.filter(User.uid == userId).first()

        if u is None:
            return False, "Invalid User"

        e = Experiment(uid=u.uid, content=experiment, description=description, name=name)
        db.session.add(e)
        db.session.commit()

        u.default_experiment_id = e.experiment_id

        ac = AccessControl(u.uid, e.experiment_id, AccessControlEnum.manage.value,
                           datetime.utcnow() + relativedelta(years=999), u.uid)

        db.session.add(u)
        db.session.add(ac)
        db.session.commit()
        return e

    def get_or_create_file_id(self, experiment_id, current_user_id, experimentFolderId, file_name, file_type, token, create_new_file=False):
        fileId = DriveTable.query.filter(DriveTable.experiment_id == experiment_id,
                                          DriveTable.uid == current_user_id, DriveTable.file_type == file_type).first()
        if fileId is None:
            if create_new_file:
                fileId = self.create_new_drive_file(experiment_id, current_user_id, [experimentFolderId], file_type, token, file_name)
                d = DriveTable(drive_file_id=fileId.driveFileId, experiment_id=experiment_id, uid=current_user_id,
                               file_type=fileId.file_type)
                db.session.add(d)
                db.session.commit()
            else:
                raise ValueError("Forbidden")
        return fileId

    def update_file_in_drive(self,data, fileId, token):
        response = requests.patch(
            "https://www.googleapis.com/upload/drive/v3/files/" + fileId.driveFileId + "?uploadType=media",
            data=data,
            headers={'Content-Type': 'text/plain', 'Authorization': 'Bearer ' + token},
            timeout=2.0
        )
        if (response.status_code != 200):
            raise ValueError("Error occurred while updating file type " + fileId.file_type)
        else:
            return True

    def push_to_drive(self, experiment_id, current_user_id, token, create_new_file=False):
        if self.user_can(experiment_id,current_user_id,AccessControlEnum.write):
            userFolderId = self.get_or_create_user_folder_id(current_user_id, token)

            experimentFolderId = self.get_or_create_experiment_folder_id(current_user_id, experiment_id, userFolderId, token)

            experiment = Experiment.query.get(experiment_id)

            dew_data = self.get_content_in_dew_format(experiment.content)
            dew_file_id = self.get_or_create_file_id(experiment_id,current_user_id,experimentFolderId, "dew_file.txt", "dew",token,create_new_file)
            self.update_file_in_drive(dew_data,dew_file_id,token)

            hlbService = HLBService()
            ns_data = hlbService.HandleNS(json.loads(experiment.content))
            ns_file_id = self.get_or_create_file_id(experiment_id,current_user_id,experimentFolderId,"ns_file.ns", "ns",token,create_new_file)
            self.update_file_in_drive(ns_data, ns_file_id, token)

            bash_data = hlbService.HandleBASH(json.loads(experiment.content))
            bash_file_id = self.get_or_create_file_id(experiment_id, current_user_id, experimentFolderId, "bash_script.sh",
                                                    "bash", token, create_new_file)
            self.update_file_in_drive(bash_data, bash_file_id, token)




    def dew_content(self, experiment_id, current_user_id):
        if self.user_can(experiment_id,current_user_id,AccessControlEnum.read.value) is not None:
            return self.get_content_in_dew_format(Experiment.query.get(experiment_id).content)
        else:
            raise ValueError("Forbidden")

    def get_content_in_dew_format(self, content_string):
        content = json.loads(content_string)
        dew_file = configparser.ConfigParser(allow_no_value=True)
        dew_file.optionxform = str
        dew_file.add_section('Scenario')
        for b in content['behaviors']:
            dew_file.set('Scenario', b)
        dew_file.add_section('Bindings')
        for b in content['bindings']:
            dew_file.set('Bindings', '{} {}'.format(b['key'], b['value']))
        dew_file.add_section('Constraints')
        for c in content['constraints']:
            dew_file.set('Constraints', c)
        x = io.StringIO()
        dew_file.write(x)
        return x.getvalue()


    def create_new_drive_file(self, experiment_id, current_user_id, parents, file_type, token,filename):
        response = requests.post(
            "https://www.googleapis.com/drive/v3/files",
            data=json.dumps({'name': filename, 'parents': parents}),
            headers={'Content-Type': 'application/json', 'Authorization': 'Bearer '+ token}
        )
        return DriveTable(drive_file_id=json.loads(response.content)['id'],experiment_id=experiment_id, uid=current_user_id, file_type=file_type)


    def get_experiment_versions(self, experiment_id, current_user_id):
        if self.user_can(experiment_id, current_user_id, AccessControlEnum.read.value) is not None:
            e = Experiment.query.filter(Experiment.experiment_id == experiment_id).first()
            if e is None:
                raise ValueError("Forbidden")
            else:
                return [{'content': json.loads(v.content), 'dew_content': self.get_content_in_dew_format(v.content), 'name': v.name, 'updated_at': v.updated_at, 'description': v.description} for v in list(e.versions)[::-1]]


    def update_experiment(self, experiment_id, current_user_id, name, content, description, driveId=None):

        e = Experiment.query.filter(Experiment.experiment_id == experiment_id).first()
        if e is None:
            raise ValueError("Forbidden")
        if self.user_can(experiment_id, current_user_id, AccessControlEnum.write.value) is not None:
            if name is not None:
                e.name = name
            if content is not None:
                e.content = content
            if description is not None:
                e.description = description
            if driveId is not None:
                e.driveId = driveId

            db.session.commit()
            return True, "Successful", e
        else:
            raise ValueError("Forbidden")

    def get_experiment(self, experiment_id, current_user_id):
        if self.user_can(experiment_id, current_user_id, AccessControlEnum.read.value) is not None:
            e = Experiment.query.filter(Experiment.experiment_id == experiment_id,
                                        Experiment.deleted_at == None).first()
            return e
        else:
            raise ValueError("Forbidden")

    def get_accessible_experiments(self, user_id):
        ac = AccessControl.query.filter(AccessControl.uid == user_id, AccessControl.expiry_date > datetime.today(),
                                        AccessControl.access_level >= AccessControlEnum.none.value).all()

        experiment_ids = [e.experiment_id for e in ac]
        experimentControl = {e.experiment_id:e.access_level for e in ac}
        experiments = [e.to_dict() for e in Experiment.query.filter(Experiment.experiment_id.in_(experiment_ids),
                                                                    Experiment.deleted_at == None).all()]

        result = []
        for e in experiments:
            obj = {'experiment_id': e['id'],
                    'name': e['name'],
                     'description': e['description'],
                   'created_date': e['created_at'].date().strftime('%m-%d-%Y'),
                   'updated_date': e['updated_at'].date().strftime('%m-%d-%Y'),
                   'accessLevel':experimentControl[e['id']]
                   }
            result.append(obj)

        return result

    def soft_delete_experiment(self, current_user_id, experiment_id):
        ac = self.user_can(experiment_id, current_user_id, AccessControlEnum.manage.value)
        if ac is not None:
            e = Experiment.query.filter(Experiment.experiment_id == experiment_id,
                                        Experiment.deleted_at == None).first()
            if e is None:
                raise ValueError("Forbidden")

            print("inside soft delete")
            e.deleted_at = datetime.utcnow()

            ac.expiry_date = datetime.utcnow()
            ac.updated_at = datetime.utcnow()
            print(ac)
            db.session.add(ac)
            db.session.add(e)
            db.session.commit()
            return True, "Successful"
        else:
            raise ValueError("Forbidden")
    def soft_delete_access(self,current_user_id, experiment_id,userHandle):
        ac = self.user_can(experiment_id, current_user_id, AccessControlEnum.manage.value)
        if ac is not None:
            user = User.query.filter(User.username == userHandle).first()
            ac1 = AccessControl.query.filter(AccessControl.experiment_id == experiment_id, AccessControl.uid == user.uid,
                                        AccessControl.expiry_date > datetime.utcnow()).first()
            if ac1 is None:
                raise {"message":"Successfully deleted."}

            # print("inside soft delete")
            ac1.expiry_date = datetime.utcnow()
            ac1.updated_at = datetime.utcnow()
            # print(ac)
            db.session.add(ac1)
            db.session.commit()
            return True, "Successful"
        else:
            raise ValueError("Forbidden")
    def copy_experiment(self, original_experiment, user_id):
        return self.create_experiment(user_id, original_experiment.content, None, original_experiment.name,
                                      original_experiment.description)

    def user_can(self, experiment_id, user_id, action):
        ac = AccessControl.query.filter(AccessControl.experiment_id == experiment_id, AccessControl.uid == user_id,
                                        AccessControl.expiry_date > datetime.today(),
                                        AccessControl.access_level >= action).first()
        return ac
    def experimentExists(self,experiment_id):
        return Experiment.query.filter(Experiment.experiment_id == experiment_id,
                                        Experiment.deleted_at == None).first()
    def grantExperimentAccess(self, experiment_id, userId, userHandle, accessLevel):
        e = self.experimentExists(experiment_id)
        ac = AccessControl.query.filter(AccessControl.experiment_id == experiment_id, AccessControl.uid == userId,
                                        AccessControl.expiry_date > datetime.utcnow(),
                                        AccessControl.access_level >= AccessControlEnum.manage.value).first()
        if ac is not None and e is not None:
            u = User.query.filter(User.username == userHandle).first()
            ac = AccessControl.query.filter(AccessControl.experiment_id == experiment_id, AccessControl.uid == u.uid,
                                        AccessControl.access_level >= AccessControlEnum.none.value).first()
            if ac is None:
                ac = AccessControl(u.uid, experiment_id, accessLevel,
                               datetime.utcnow() + relativedelta(years=999), userId)
            else:
                ac.access_level = accessLevel
                ac.updated_at = datetime.utcnow()
                ac.expiry_date = datetime.utcnow() + relativedelta(years=999)
                ac.last_updated_by_user = userId
            db.session.add(u)
            db.session.add(ac)
            db.session.commit()
            return {'message': 'Access granted.'}
        else:
            return {'error': 'User does not have access.'}
    
    def getExperimentControlInfoByUserId(self,experiment_id,userId):
        result = {}
        ac = AccessControl.query.filter(AccessControl.experiment_id == experiment_id, AccessControl.uid == userId,
                                        AccessControl.expiry_date > datetime.utcnow()).first()
        if ac is not None:
            if AccessControlEnum.manage.value == ac.access_level:
                result['accessLevel'] = 'Manage'
                result['code'] = AccessControlEnum.manage.value
            elif AccessControlEnum.read.value == ac.access_level:
                result['accessLevel'] = 'Read'
                result['code'] = AccessControlEnum.read.value
            elif AccessControlEnum.write.value == ac.access_level:
                result['accessLevel'] = 'Write'
                result['code'] = AccessControlEnum.write.value
            else:
                result['error'] = 'User does not have access.'

            return result
        else:
            return {'error': 'User does not have access.'}
    def getUserAccessList(self,userId,experimentId):
        ac = AccessControl.query.filter(AccessControl.experiment_id==experimentId, AccessControl.uid==userId,AccessControl.expiry_date>datetime.utcnow(), AccessControl.access_level>=AccessControlEnum.manage.value).first()
        result = {}
        if ac is not None:
            ac1 = AccessControl.query.filter(AccessControl.experiment_id==experimentId, AccessControl.uid!=userId,AccessControl.expiry_date>datetime.utcnow(), AccessControl.access_level>AccessControlEnum.none.value).all()
            r = [i.uid for i in ac1] 
            userList = {}
            for i in ac1:
                if i.access_level == AccessControlEnum.read.value:
                    userList[i.uid] = 'Read'
                elif i.access_level == AccessControlEnum.write.value:
                    userList[i.uid] = 'Write'
                elif i.access_level == AccessControlEnum.manage.value:
                    userList[i.uid] = 'Mange'
                else:
                    userList[i.uid] = 'None'
            result['userList'] = [{'name':i.name,'handle':i.username,'accessLevel':userList[i.uid]} for i in User.query.filter(User.uid.in_(r)).all()]
        
        else:
            result = {'error':'Un Authorized user','location':'logout'}
        return result

    def get_or_create_user_folder_id(self, current_user_id, token):
        user = User.query.get(current_user_id)
        if user.drive_folder_id is None:
            user.drive_folder_id = self.create_folder_id("Distributed Experiment Workflows",tuple(),token)
            db.session.commit()

        return user.drive_folder_id

    def create_folder_id(self, title, parents, token):
        response = requests.post(
            "https://www.googleapis.com/drive/v3/files",
            data=json.dumps({'name': title, 'mimeType': 'application/vnd.google-apps.folder', 'parents': parents}),
            headers={'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
        )
        return json.loads(response.content)['id']

    def get_or_create_experiment_folder_id(self, current_user_id, experiment_id, user_folder_id, token):
        driveTableId = DriveTable.query.filter(DriveTable.experiment_id == experiment_id,
                                              DriveTable.uid == current_user_id, DriveTable.file_type == "folder").first()
        if driveTableId is None:
            experiment = Experiment.query.get(experiment_id)
            driveFileId = self.create_folder_id(experiment.name + " created on " + str(experiment.created_at), (user_folder_id,),token)
            driveTableId = DriveTable(drive_file_id=driveFileId,experiment_id=experiment_id,uid=current_user_id,file_type="folder")
            db.session.add(driveTableId)
            db.session.commit()

        return driveTableId.driveFileId



