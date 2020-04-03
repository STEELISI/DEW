from extensions import db
from datetime import datetime

class Experiment(db.Model):

    experiment_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, default='untitled')
    description = db.Column(db.Text)
    # nlp_content = db.Column(db.Text)
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime,nullable=False,default=datetime.utcnow)
    updated_at = db.Column(db.DateTime,onupdate=datetime.utcnow, default=datetime.utcnow)
    uid = db.Column(db.String, db.ForeignKey('user.uid'))


    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            # 'nlp_content': self.nlp_content,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'uid': self.uid
            }


    def __init__(self, content, uid, description='', name=''):
        super().__init__()
        self.content = content
        self.uid = uid
        self.description = description
        self.name = name
