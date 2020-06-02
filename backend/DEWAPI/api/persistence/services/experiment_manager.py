from extensions import db
from DEWAPI.models.user import User
from DEWAPI.models.experiment import Experiment
from DEWAPI.models.drive_table import DriveTable
from DEWAPI.models.access_control import AccessControl
from utilities.access_control_enum import AccessControlEnum
from datetime import datetime
from dateutil.relativedelta import relativedelta
import requests
import json
from sqlite3 import Error


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

    def push_to_drive(self, experiment_id, current_user_id, token, create_new_file=False):
        driveId = DriveTable.query.filter(DriveTable.experiment_id == experiment_id, DriveTable.uid == current_user_id).first().driveFileId
        if self.user_can(experiment_id,current_user_id,AccessControlEnum.write):
            if driveId is None:
                if create_new_file:
                    driveId = self.create_new_drive_file(experiment_id, current_user_id, token)
                    d = DriveTable(drive_file_id=driveId,experiment_id=experiment_id,uid=current_user_id)
                    db.session.add(d)
                    db.session.commit()
                else:
                    raise ValueError("Forbidden")

            response = requests.patch(
                "https://www.googleapis.com/upload/drive/v3/files/"+driveId+"?uploadType=media",
                 data=self.dew_content(experiment_id),
                 headers={'Content-Type': 'text/plain', 'Authorization': 'Bearer '+ token},
                 timeout=2.0
            )
            if(response.status_code != 200):
                raise ValueError("Error occured")
            else:
                return True


    def dew_content(self, experiment_id):
        x = json.dumps(Experiment.query.get(experiment_id).content)
        print(x)
        return x


    def create_new_drive_file(self, experiment_id, current_user_id, token):
        e = self.get_experiment(experiment_id,current_user_id)
        response = requests.post(
            "https://www.googleapis.com/drive/v3/files",
            data=json.dumps({'name': e.name}),
            headers={'Content-Type': 'application/json', 'Authorization': 'Bearer '+ token}
        )
        print(json.loads(response.content))
        return json.loads(response.content)['id']


    def get_experiment_versions(self, experiment_id, current_user_id):
        if self.user_can(experiment_id, current_user_id, AccessControlEnum.read.value):
            e = Experiment.query.filter(Experiment.experiment_id == experiment_id).first()
            if e is None:
                raise ValueError("Forbidden")
            else:
                return [{'content': v.content, 'name': v.name, 'updated_at': v.updated_at, 'description': v.description} for v in list(e.versions)]


    def update_experiment(self, experiment_id, current_user_id, name, content, description, driveId=None):

        e = Experiment.query.filter(Experiment.experiment_id == experiment_id).first()
        if e is None:
            raise ValueError("Forbidden")
        if self.user_can(experiment_id, current_user_id, AccessControlEnum.write.value):
            if name is not None:
                e.name = name
            if content is not None:
                e.content = content
            if description is not None:
                e.description = description
            if driveId is not None:
                e.driveId = driveId

            db.session.commit()
            return True, "Successfull"
        else:
            raise ValueError("Forbidden")

    def get_experiment(self, experiment_id, current_user_id):
        if self.user_can(experiment_id, current_user_id, AccessControlEnum.read.value):
            e = Experiment.query.filter(Experiment.experiment_id == experiment_id,
                                        Experiment.deleted_at == None).first()
            return e
        else:
            raise ValueError("Forbidden")

    def get_accessible_experiments(self, user_id):
        ac = AccessControl.query.filter(AccessControl.uid == user_id, AccessControl.expiry_date > datetime.today(),
                                        AccessControl.access_level >= AccessControlEnum.none.value).all()

        experiment_ids = [e.experiment_id for e in ac]

        experiments = [e.to_dict() for e in Experiment.query.filter(Experiment.experiment_id.in_(experiment_ids),
                                                                    Experiment.deleted_at == None).all()]

        print(experiments)
        result = []
        for e in experiments:
            obj = {'experiment_id': e['id'], 'name': e['name'], 'description': e['description'],
                   'created_date': e['created_at'].date().strftime('%m-%d-%Y'),
                   'updated_date': e['updated_at'].date().strftime('%m-%d-%Y')}
            result.append(obj)

        return result

    def soft_delete_experiment(self, current_user_id, experiment_id):
        if self.user_can(experiment_id, current_user_id, AccessControlEnum.manage.value):
            e = Experiment.query.filter(Experiment.experiment_id == experiment_id,
                                        Experiment.deleted_at == None).first()
            if e is None:
                raise ValueError("Forbidden")
            e.deleted_at = datetime.utcnow()
            db.session.commit()
            return True, "Successfull"
        else:
            raise ValueError("Forbidden")

    def copy_experiment(self, original_experiment, user_id):
        return self.create_experiment(user_id, original_experiment.content, None, original_experiment.name,
                                      original_experiment.description)

    def user_can(self, experiment_id, user_id, action):
        ac = AccessControl.query.filter(AccessControl.experiment_id == experiment_id, AccessControl.uid == user_id,
                                        AccessControl.expiry_date > datetime.today(),
                                        AccessControl.access_level >= action).first()
        return (ac is not None)

    def grantExperimentAccess(self, experiment_id, userId, userHandle):
        ac = AccessControl.query.filter(AccessControl.experiment_id == experiment_id, AccessControl.uid == userId,
                                        AccessControl.expiry_date > datetime.today(),
                                        AccessControl.access_level >= AccessControlEnum.manage.value).first()
        if ac is not None:
            u = User.query.filter(User.username == userHandle).first()
            ac = AccessControl(u.uid, experiment_id, AccessControlEnum.write.value,
                               datetime.utcnow() + relativedelta(years=999), userId)
            db.session.add(u)
            db.session.add(ac)
            db.session.commit()
            return {'message': 'Access granted.'}
        else:
            return {'error': 'User does not have access.'}
