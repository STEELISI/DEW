import requests

from flask import request,jsonify


class GoogleLogin():

    def getUserInfo(self,token):
        try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            CLIENT_ID = '926607687771-0lll564e4sbjo4davt10fufmhuehgl1s.apps.googleusercontent.com'
            response = requests.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+token).json()
            # response.content
            # print(request.get_json(response.content))
            result = {}
            result['emailId'] = response['email']
            result['givenName'] = response['given_name']
            result['lastName'] = response['family_name']
            result['img'] = response['picture']
            result['fullName'] = response['name']
            return result
        except ValueError as e:
            # Invalid token
            print(e)
            pass