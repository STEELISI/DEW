import sys, json
from flask import request, escape
from flask_restplus import Resource
sys.path.append('./DEWAPI/api/')
from DEWAPI.api.restplus import api
from DEWAPI.api.common.serializers import persist_data
import persistence.services.sqlite3

ns = api.namespace('v1/persist', description='Persistence related opertions')


@ns.route('/save')
class HandleSave(Resource):

    @api.expect(persist_data)
    def put(self):
        """
          Save content to database
        """
        content = request.get_json(force=True)
        username = content['username']
        actors = content['actors']
        constraints = content['constraints']
        behaviors = content['behaviors']
        bindings = content['bindings']
        experiment = json.dumps({'actors': actors, 'constraints': constraints, 'behaviors': behaviors, 'bindings': bindings})
        print("Experiment : ", json.loads(json.dumps({'actors': actors, 'constraints': constraints, 'behaviors': behaviors, 'bindings': bindings},ensure_ascii=False)))
        response = persistence.services.sqlite3.create_or_update_experiment(experiment=experiment, username=username)
        return {'saved': response }

         # persistence.services.sqlite3.query_db("select id from users where username="+username,one=True)
         # return 
        # print(str(content))
        # return response


@ns.route("/get/<username>")
class HandleRetrieve(Resource):
    @api.doc(params={'username': 'Username of the experiment'})
    def get(self, username):
      """
        Retrieve content from database
      """
      return json.loads(persistence.services.sqlite3.find_experiment(username)['experiment'])