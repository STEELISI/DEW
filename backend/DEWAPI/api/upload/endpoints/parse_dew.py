import sys
from flask import request
from flask_restplus import Resource
sys.path.append('./DEWAPI/api/')
from DEWAPI.api.restplus import api
from upload.services.dew_parser import DEWParser
from common.fileupload_parser import parser, upload_parser

ns = api.namespace('v1/upload', description='Operations related to upload')

dew_parser = DEWParser()

@ns.route('/dew')
class HandleTranslator(Resource):

    @api.expect(upload_parser)
    def put(self):
        """
          Get the actors, behaviors and constraints for a given string of text parsed using NLP.
        """
        uploaded_file = upload_parser.parse_args()['file']
        content = uploaded_file.read()
        x = dew_parser.get_behaviors_and_constraints(content.decode("utf-8"))
        print(x)
        return x
        # print(str(content))
        # return response

