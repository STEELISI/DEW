import requests

from flask import request,jsonify
from DEWAPI.models.user import User
from extensions import db
class GoogleLogin():

    def getUserInfo(self,token):
        try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            CLIENT_ID = '926607687771-0lll564e4sbjo4davt10fufmhuehgl1s.apps.googleusercontent.com'
            response = requests.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+token).json()
            # response.content
            # print(request.get_json(response.content))
            userId = response['email'].split('@')[0]
            uid = userId +"-"+ response['id']
            result = {}
            result['emailId'] = response['email']
            result['givenName'] = response['given_name']
            result['lastName'] = response['family_name']
            result['img'] = response['picture']
            result['fullName'] = response['name']
            result['userId'] = uid
            print(result)
            self.getOrStoreUserInfo(uid=uid,emailId=response['email'],username=userId,name=response['name'],access_token=token)
            return result
        except ValueError as e:
            # Invalid token
            print(e)
            pass
    def getOrStoreUserInfo(self,uid,username,name,emailId,access_token):
        u = User.query.filter(User.uid == uid).first()
        print(u)
        if u is None:
            u = User(username=username, email=emailId, uid=uid, name=name,access_token=access_token)
            db.session.add(u)
            db.session.commit()