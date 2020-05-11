import sys
from flask import request
from flask_restplus import Resource
sys.path.append('./DEWAPI/api/')
from DEWAPI.api.restplus import api
from common.serializers import  user_object,user_handle,register_user_handle, userAccessListModel
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

@ns.route('/getgoogleuserinfo/')
class HandleGoogleUserInfo(Resource):

    @api.expect(user_object)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)
       
        print(json_data)
        return login.googleUserInfo(json_data["token"])

@ns.route('/validateUser/')
class HandleValidateUser(Resource):

    @api.expect(user_object)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)
       
        print(json_data)
        return login.validate(json_data["token"])

@ns.route('/validateUserHandle/')
class HandleValidateUserHandle(Resource):

    @api.expect(user_handle)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)

        return login.validateHandle(json_data["handle"])

@ns.route('/registerUser/')
class HandleRegisterUserHandle(Resource):

    @api.expect(register_user_handle)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)

        return login.registerUserHandle(json_data["handle"],json_data["token"])

@ns.route('/getUserHandles/<token>')
class HandleGetUserHandle(Resource):
    @api.doc(params={'token': 'Username of the experiment'})
    def get(self,token):
        print(token)
        return login.getUserHandles(token)

@ns.route('/getUserAccessList/')
class HandleGetUserHandle(Resource):
    @api.expect(userAccessListModel)
    def post(self):
        
        json_data = request.get_json(force=True)
        return login.getUserAccessList(json_data['userId'],json_data['experiment_id'])