from extensions import db
from DEWAPI.models.deterlab_account_details import DeterlabAccountDetails
from datetime import datetime
from DEWAPI.encryption import AESCipher
from DEWAPI import settings

aESCipher = AESCipher(settings.ENCRYPTION_KEY)

class ProfileService(object):
    def save(self, uid, username, password):
        u = DeterlabAccountDetails.query.filter(DeterlabAccountDetails.uid == uid).first()
        
        password = aESCipher.encrypt(password).decode('utf-8')

        if u is None:
            e = DeterlabAccountDetails(uid=uid, username=username, password=password, isdeleted=False)
            db.session.add(e)
        else:
            u.username = username
            u.password = password
            u.isdeleted = False
        
        db.session.commit()

        return "Successfull"

    def delete(self, uid):
        u = DeterlabAccountDetails.query.filter(DeterlabAccountDetails.uid == uid).first()

        if u is not None:
            u.isdeleted = True
            db.session.commit()

        return "Successfull"
    
    def get(self, userId):
        u = DeterlabAccountDetails.query.filter(DeterlabAccountDetails.uid == userId, DeterlabAccountDetails.isdeleted == False).first()
        
        # print("inside get")
        if u is None:
            return {"username":"","password":""}
        else:
            result = {}
            detailObject = u.to_dict()
            result['username'] = detailObject['username']
            result['password'] = aESCipher.decrypt(detailObject['password']).decode('utf-8')
            return result  

    def getUserList(self,uid):
        u = DeterlabAccountDetails.query.filter(DeterlabAccountDetails.uid == uid, DeterlabAccountDetails.isdeleted == False)
        result = []
        for x in u:
            detailObject = x.to_dict()
            r = {}
            r['username'] = detailObject['username']
            result.append(r)
        return result  
