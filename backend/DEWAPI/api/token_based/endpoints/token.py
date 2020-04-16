import sys, json
from DEWAPI.api.restplus import api
from flask import request, escape
from flask_restplus import Resource
from DEWAPI.api.common.serializers import token_data, experiment_detail
from DEWAPI.models.user import User
from DEWAPI.models.auth_token import AuthToken
from DEWAPI.api.token_based.services.token_manager import TokenManager

ns = api.namespace('v1/token-based-auth', description='Access experiments using tokens')

tm = TokenManager()

@ns.route('/')
class HandleRootPath(Resource):
    @api.expect(token_data)
    def post(self):
        """
        Create token for a given experiment
        """
        content = request.get_json(force=True)
        experiment_id = content['experiment_id']
        access_level = content['access_level']
        creator_uid = content['creator_uid']

        try:
            token = tm.create_token(experiment_id, access_level, creator_uid)
            return token, 201
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

