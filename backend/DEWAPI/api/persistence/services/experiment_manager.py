from extensions import db
from DEWAPI.models.user import User
from DEWAPI.models.experiment import Experiment
from DEWAPI.models.access_control import AccessControl
from utilities.access_control_enum import AccessControlEnum
from datetime import datetime
from dateutil.relativedelta import relativedelta
from sqlite3 import Error


class ExperimentManager(object):
    def save_experiment(self, userId, experiment,id,name,description):
        # try:
        u = User.query.filter(User.uid == userId).first()

        if u is None:
            return False,"Invalid User"
        
        e = Experiment(uid=u.uid, content=experiment,description=description,name=name)        
        db.session.add(e)
        db.session.commit()

        u.default_experiment_id = e.id

        # ac = AccessControl(u.uid, e.experiment_id, AccessControlEnum.manage.value, datetime.utcnow() + relativedelta(years=999), u.uid)
        
        # db.session.add(u)
        # db.session.add(ac)
        # db.session.commit()
        return True,"Successfull"
    
        
            