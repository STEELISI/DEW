from extensions import db
from datetime import datetime


class DeterlabAccountDetails(db.Model):
    __tablename__ = 'deterlab-account-details'

    uid = db.Column(db.String, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    last_login_time = db.Column(db.DateTime)
    isdeleted = db.Column(db.Boolean)

    def to_dict(self):
        return {
            'uid': self.uid,
            'username': self.username,
            'password': self.password,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'last_login_time': self.last_login_time,
            'isdeleted': self.isdeleted
            }