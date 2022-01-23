from flask import request
from flask_restplus import Resource
from DEWAPI.api.restplus import api
from DEWAPI.api.common.serializers import *
from DEWAPI.api.public.services.userinfoservice import GoogleLogin


ns = api.namespace('v1/p', description='Public operations does not require authentication.')

login = GoogleLogin()

@ns.route('/user/getuserinfo/')
class HandleUserTranslator(Resource):

    @api.expect(user_object)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)
       
        print(json_data)
        return login.getUserInfo(json_data["token"])

@ns.route('/user/getgoogleuserinfo/')
class HandleUserGoogleInfo(Resource):

    @api.expect(user_object)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)
       
        print(json_data)
        return login.googleUserInfo(json_data["token"])

@ns.route('/user/validateUser/')
class HandleUserValidate(Resource):

    @api.expect(user_object)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)
        print(json_data)
        return login.validate(json_data["token"])

@ns.route('/user/validateUserHandle/')
class HandleUserHandleValidate(Resource):

    @api.expect(user_handle)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)

        return login.validateHandle(json_data["handle"])

@ns.route('/user/registerUser/')
class HandleUserHandleRegister(Resource):

    @api.expect(register_user_handle)
    def post(self):
        # json_data = request.get_json(force=True)
        # print(token)
        json_data = request.get_json(force=True)
        return login.registerUserHandle(json_data["handle"],json_data["token"])
    
