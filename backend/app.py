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
from DEWAPI.api.hlb.endpoints.hlb_v2 import ns as hlb_v2_namespace
from DEWAPI.api.nlp.endpoints.nlp import ns as nlp_namespace
from DEWAPI.api.persistence.endpoints.persist import ns as persist_namespace
from DEWAPI.api.upload.endpoints.parse_dew import ns as upload_namespace
import DEWAPI.api.persistence.services.sqlite3
from DEWAPI.api.restplus import api
from extensions import db


def register_extensions(app):
    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)
    api.add_namespace(hlb_namespace)
    api.add_namespace(hlb_v2_namespace)
    api.add_namespace(nlp_namespace)
    api.add_namespace(upload_namespace)
    api.add_namespace(persist_namespace)
    app.register_blueprint(blueprint)
    db.init_app(app)


def create_app():
    flask_app = Flask(__name__)
# app.debug = true
    flask_app.config.from_object('DEWAPI.settings')
    register_extensions(flask_app)
    return flask_app


app = create_app()