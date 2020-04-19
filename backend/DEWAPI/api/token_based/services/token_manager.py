from extensions import db
from DEWAPI.models.auth_token import AuthToken
from DEWAPI.models.experiment import Experiment
from DEWAPI.models.access_control import AccessControl
from utilities.access_control_enum import AccessControlEnum
from datetime import datetime
import uuid

class TokenManager(object):
    def create_token(self, experiment_id, access_level, creator_uid):
        if self.user_can(experiment_id, creator_uid, AccessControlEnum.manage.value):
            atoken = AuthToken(experiment_id=experiment_id, creator_uid=creator_uid, access_level=access_level, active=True, token=str(uuid.uuid4()))
            db.session.add(atoken)
            db.session.commit()

            return atoken.to_dict()
        else:
            raise ValueError("Forbidden")

    def user_can(self, experiment_id, user_id, action):
        ac = AccessControl.query.filter(AccessControl.experiment_id==experiment_id, AccessControl.uid==user_id,AccessControl.expiry_date>datetime.today(), AccessControl.access_level>=action).first()
        return (ac is not None)

    def getTokenList(self,experiment_id,creater_id):
        result = [e.to_dict() for e in AuthToken.query.filter(AuthToken.experiment_id == experiment_id, AuthToken.creator_uid == creater_id)]
        
        # print(result)
        return result