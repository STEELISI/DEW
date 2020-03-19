from extensions import db
from DEWAPI.models.user import User
from DEWAPI.models.experiment import Experiment
from DEWAPI.models.access_control import AccessControl
from utilities.access_control_enum import AccessControlEnum
from datetime import datetime
from dateutil.relativedelta import relativedelta


class ExperimentManager(object):
    def save_experiment(self, username, experiment):
        u = User.query.filter(User.username == username).first()
        if u is None:
            u = User(username=username, email="no-email@no-email.com", uid=username, name=username)
            db.session.add(u)
            db.session.commit()

        e = Experiment(uid=u.uid, content=experiment)        
        db.session.add(e)
        db.session.commit()

        u.default_experiment_id = e.experiment_id

        ac = AccessControl(u.uid, e.experiment_id, AccessControlEnum.manage.value, datetime.utcnow() + relativedelta(years=999), u.uid)
        
        db.session.add(u)
        db.session.add(ac)
        db.session.commit()

        
            