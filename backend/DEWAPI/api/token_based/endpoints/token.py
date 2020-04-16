import sys, json
from DEWAPI.api.restplus import api
from flask import request, escape
from flask_restplus import Resource
from DEWAPI.api.common.serializers import token_data, uid_header_parser, experiment_update_by_token
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
    
@ns.route('/list/<experiment_id>')
class HandleListForExperiment(Resource):
    @api.expect(uid_header_parser)
    def get(self, experiment_id):
        """
        Get tokens for a given experiment
        """
        # content = request.get_json(force=True)
        # experiment_id = content['experiment_id']
        uid = request.headers['x-user-id']
        try:
            tokens = tm.get_tokens(experiment_id, uid)
            return {'status': 'Successful', 'data': tokens }
        except ValueError as e:
            if(str(e) == "Forbidden"):
                return {'status': 'Failure'}, 403


@ns.route('/get/<access_token>')
class HandleGetExperiment(Resource):
    def get(self, access_token):
        """
        Get experiment from token
        """
        # content = request.get_json(force=True)
        # experiment_id = content['experiment_id']
        try:
            experiment = tm.get_experiment_data(access_token)
            return {'status': 'Successful', 'data': experiment.to_dict() }
        except ValueError as e:
            if(str(e) == "Not found"):
                return {'status': 'Failure'}, 404

@ns.route('/update/<access_token>')
class HandleGetExperiment(Resource):
    @api.expect(experiment_update_by_token)
    def put(self, access_token):
        """
        Get experiment from token
        """
        update_content = request.get_json(force=True)

        # experiment_id = content['experiment_id']
        try:
            experiment = tm.update_experiment(access_token, update_content)
            return {'status': 'Successful', 'data': experiment.to_dict() }
        except ValueError as e:
            if(str(e) == "Not found"):
                return {'status': 'Failure'}, 404
            elif (str(e) == "Forbidden"):
                return {'status': 'Failure'}, 403


