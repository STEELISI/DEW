import sys, json
from flask import request, escape
from flask_restplus import Resource
sys.path.append('./DEWAPI/api/')
from DEWAPI.api.restplus import api
from DEWAPI.api.common.serializers import persist_data, experiment_detail
from DEWAPI.models.user import User
import persistence.services.sqlite3
from persistence.services.experiment_manager import ExperimentManager

ns = api.namespace('v1/persist', description='Persistence related opertions')
em = ExperimentManager()

@ns.route('/save')
class HandleSave(Resource):

    @api.expect(persist_data)
    def put(self):
        """
          Save content to database
        """
        content = request.get_json(force=True)
        userId = content['userId']
        actors = content['actors']
        constraints = content['constraints']
        behaviors = content['behaviors']
        bindings = content['bindings']
        experimentId = None
        if 'id' in content:
          experimentId = content['id']
        name = content['name']
        description = content['description']
        experiment_content = json.dumps({'actors': actors, 'constraints': constraints, 'behaviors': behaviors, 'bindings': bindings})
        print("Experiment : ", json.loads(json.dumps({'actors': actors, 'constraints': constraints, 'behaviors': behaviors, 'bindings': bindings},ensure_ascii=False)))

        if experimentId is None or experimentId.strip() == '':
          flag, message = em.save_experiment(userId, experiment_content,experimentId,name,description)
        else: 
          flag, message = persistence.services.sqlite3.update_experiment(experiment_content,userId,experimentId,name,description)
        return {'saved': flag,'message':message }

         # persistence.services.sqlite3.query_db("select id from users where username="+username,one=True)
         # return 
        # print(str(content))
        # return response


@ns.route("/getExperimentList/<userId>")
class HandleRetrieve(Resource):
    @api.doc(params={'userId': 'Username of the experiment'})
    def get(self, userId):
      """
        Retrieve content from database
      """
      print(userId)

      experiment = persistence.services.sqlite3.find_experiment(userId)

      result = []
      if experiment is not None:
        result=experiment
        
      return result

@ns.route("/getExperimentById")
class HandleRetrieve(Resource):
    @api.expect(experiment_detail)
    def post(self):
      """
        Retrieve content from database by experiment id and userId
      """
      
      content = request.get_json(force=True)
      userId = content['userId']
      id1 = content['id']
      experiment = persistence.services.sqlite3.getExperimentById(userId,id1)
      
      result = {}
      if experiment is not None:
        result=json.loads(experiment['experiment'])
        
      return result