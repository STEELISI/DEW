from extensions import db
from DEWAPI.models.user import User
from DEWAPI.models.experiment import Experiment
from DEWAPI.models.access_control import AccessControl
from utilities.access_control_enum import AccessControlEnum
from datetime import datetime
from dateutil.relativedelta import relativedelta
from sqlite3 import Error


class ExperimentManager(object):
    def create_experiment(self, userId, experiment,id,name,description):
        # try:
        u = User.query.filter(User.uid == userId).first()

        if u is None:
            return False,"Invalid User"
        
        e = Experiment(uid=u.uid, content=experiment,description=description,name=name)        
        db.session.add(e)
        db.session.commit()

        u.default_experiment_id = e.experiment_id

        ac = AccessControl(u.uid, e.experiment_id, AccessControlEnum.manage.value, datetime.utcnow() + relativedelta(years=999), u.uid)
        
        db.session.add(u)
        db.session.add(ac)
        db.session.commit()
        return True,"Successfull"

    
    def update_experiment(self, experiment_id, current_user_id, name, content, description):
        
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

            db.session.commit()
            return True, "Successfull"
        else:
            raise ValueError("Forbidden")
    

    def get_experiment(self, experiment_id, current_user_id):
        if self.user_can(experiment_id, current_user_id, AccessControlEnum.read.value):
            e = Experiment.query.filter(Experiment.experiment_id == experiment_id).first()
            return e
        else:
            raise ValueError("Forbidden")


    def get_accessible_experiments(self, user_id):
        ac = AccessControl.query.filter(AccessControl.uid==user_id,AccessControl.expiry_date>datetime.today(), AccessControl.access_level>=AccessControlEnum.none.value).all()
        experiments = [Experiment.query.get(e.experiment_id).to_dict() for e in ac]
        print(experiments)
        return experiments


    def user_can(self, experiment_id, user_id, action):
        ac = AccessControl.query.filter(AccessControl.experiment_id==experiment_id, AccessControl.uid==user_id,AccessControl.expiry_date>datetime.today(), AccessControl.access_level>=action).first()
        return (ac is not None)

                

    
        
            