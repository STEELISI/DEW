from extensions import db
from datetime import datetime

import json

class Slide(db.Model):
	__tablename__ = 'experiment_slides'
	
	slide_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	experiment_id = db.Column(db.Integer,db.ForeignKey('experiment.experiment_id'))
	sequence_number = db.Column(db.Integer,default=1,nullable=False)
	actor_action_mapping = db.Column(db.Text)
	created_at = db.Column(db.DateTime,default=datetime.utcnow)
	updated_at = db.Column(db.DateTime,onupdate=datetime.utcnow)
	

	def to_dict(self):
		return {
			'slide_id' : self.slide_id,
			'experiment_id': self.experiment_id,
			'sequence_number': self.sequence_number,
			'actor_action_mapping': self.actor_action_mapping,
			'created_at': self.created_at,
			'updated_at': self.updated_at
		}

	def dew_string(self):
		mapping = json.loads(self.actor_action_mapping)
		dew_string = ""
		for actor in mapping:
			dew_string += str(actor) + " " + str(mapping[actor]) + "\n"
		return dew_string