import sys
from flask import request
from flask_restplus import Resource
sys.path.append('./DEWAPI/api/')
from DEWAPI.api.common.serializers import nlp_text
from DEWAPI.api.restplus import api
from DEWAPI.api.nlp.services.nlpServices import NLPService

ns = api.namespace('v1/nlp', description='Operations related to nlp')

obj = NLPService()

@ns.route('/behavior')
class HandleTranslator(Resource):

    @api.expect(nlp_text)
    def put(self):
        """
          Get the actors, behaviors and constraints for a given string of text parsed using NLP.
        """
        nlp_text = request.get_json(force=True)['text']
        response = obj.HandleNLPString(nlp_text)
        print(response)
        return response

