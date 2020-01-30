# import sys
# import os
# import uuid
# import random
# from flask import Flask, redirect, request, jsonify, send_file, Blueprint
# from flask_restful import Resource, Api, reqparse
# from flask_cors import CORS
# import werkzeug

# sys.path.append('./DewFunctions/Generators/')
# sys.path.append('./DewFunctions/UI/HighLevelBehaviorLanguage/')
# sys.path.append('./DewFunctions/UI/')
# sys.path.append('./DewFunctions/Translators/bash')
# sys.path.append('./DewFunctions/Translators/magi')
# from parsebash import GeneralParseBash
# from generator import GeneralGenerator
# from generator import GeneralGenerator

# app = Flask(__name__)
# api = Api(app)
# cors = CORS(app, resources={r"*": {"origins": "*"}})
# hlb = {}

import os
import sys
from flask import Flask, Blueprint, request
from flask_restplus import Api
from DEWAPI import settings
from DEWAPI.api.hlb.endpoints.hlb import ns as hlb_namespace
from DEWAPI.api.nlp.endpoints.nlp import ns as nlp_namespace
from DEWAPI.api.upload.endpoints.parse_dew import ns as upload_namespace
from DEWAPI.api.restplus import api
app = Flask(__name__)
# app.debug = true

@app.before_request
def log_headers():
    print(request.headers)

def configure_app(flask_app):
    flask_app.config['SERVER_NAME'] = settings.FLASK_SERVER_NAME
    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    flask_app.config['ERROR_404_HELP'] = settings.RESTPLUS_ERROR_404_HELP

def initialize_app(flask_app):
    configure_app(flask_app)
    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)
    api.add_namespace(hlb_namespace)
    api.add_namespace(nlp_namespace)
    api.add_namespace(upload_namespace)
    flask_app.register_blueprint(blueprint)


def main():
    initialize_app(app)
    app.run(debug=settings.FLASK_DEBUG)


if __name__ == "__main__":
    main()

