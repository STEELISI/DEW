import sys
from flask import request
from flask_restplus import Resource
sys.path.append('./DEWAPI/api/')
from DEWAPI.api.restplus import api
from common.serializers import  user_object
from DEWAPI.api.userinfo.services.userinfoservice import GoogleLogin
ns = api.namespace('v1/user', description='Operations related to user')

login = GoogleLogin()
@ns.route('/getuserinfo/')
class HandleTranslator(Resource):

    @api.expect(user_object)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)
       
        print(json_data)
        return login.getUserInfo(json_data["token"])

