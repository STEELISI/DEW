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
          experiment = em.create_experiment(userId, experiment_content,experimentId,name,description)
          if experiment is not None:
              return {'saved': True,'message':"Successful" }
            
        else: 
          try:
            flag , message = em.update_experiment(experimentId,userId,name=name, description=description,content=experiment_content)
            return {'saved': flag,'message':message }
          except ValueError as e:
            msg = {'saved': False, 'message': str(e)}
            return msg, 403

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

      experiment = em.get_accessible_experiments(userId)

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
      try:
        experiment = em.get_experiment(id1, userId)
        
        result = {}
        if experiment is not None:
          r = experiment.to_dict()
          result=json.loads(r['content'])
          result['name'] = r['name']
          result['description'] = r['description']
          
        return result
      except ValueError as e:
        if str(e) == "Forbidden":
          return {}, 403


@ns.route("/experiment/delete")
class HandleDelete(Resource):
  @api.expect(experiment_detail)
  def delete(self):
    """
      Delete experiment from database
    """
    content = request.get_json(force=True)
    userId = content['userId']
    experiment_id = content['id']
    
    try:
      em.soft_delete_experiment(userId, experiment_id)
      return None, 204
    except ValueError as e:
      if str(e) == "Forbidden":
        return {}, 403


@ns.route("/experiment/copy")
class HandleDelete(Resource):
  @api.expect(experiment_detail)
  def post(self):
    """
      Duplicate the experiment
    """
    content = request.get_json(force=True)
    userId = content['userId']
    experiment_id = content['id']
    
    try:
      experiment = em.get_experiment(experiment_id, userId)
      copied_experiment = em.copy_experiment(experiment, userId)
      return copied_experiment.to_dict(), 201
    except ValueError as e:
      if str(e) == "Forbidden":
        return {}, 403
