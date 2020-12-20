from extensions import db
from DEWAPI.models.user import User
from DEWAPI.models.experiment_deter_mapping import DeterLabExperimentMapping
from DEWAPI.models.access_control import AccessControl
from utilities.access_control_enum import AccessControlEnum
from datetime import datetime
import requests
import json
import configparser
import io


class DeterLabExperimentMapper(object):
    
    def createOrModifyMapping(self, uid, experiment_id, project_name, experiment_name):
        m = DeterLabExperimentMapping.query.filter(DeterLabExperimentMapping.uid == uid , DeterLabExperimentMapping.experiment_id == experiment_id , DeterLabExperimentMapping.isdeleted == False).first()

        if m is None:
            mapping = DeterLabExperimentMapping(uid=uid, experiment_id=experiment_id, project_name=project_name, experiment_name=experiment_name,isdeleted=False)
            db.session.add(mapping)
        else:
            m.project_name = project_name
            m.experiment_id = experiment_id
            m.experiment_name = experiment_name
            m.updated_at = datetime.utcnow()
            m.isdeleted = False
            db.session.add(m)
        
        db.session.commit()

        return "Successfull"
    
    def getMapping(self, uid, experiment_id):
        result = {}
        m = DeterLabExperimentMapping.query.filter(DeterLabExperimentMapping.uid == uid, DeterLabExperimentMapping.experiment_id == experiment_id, DeterLabExperimentMapping.isdeleted == False).first()
        
        if m is None:
            result['error'] = 'No Mapping Found.'
        else:
            result['mapping_id'] = m.mid
            result['project_name'] = m.project_name
            result['experiment_name'] = m.experiment_name
        
        return result
    def user_can(self, uid, experiment_id):
        ac = AccessControl.query.filter(AccessControl.experiment_id == experiment_id, AccessControl.uid == uid,
                                        AccessControl.expiry_date > datetime.today(),
                                        AccessControl.access_level >= AccessControlEnum.read.value).first()
        # print(ac)
        return ac is not None

