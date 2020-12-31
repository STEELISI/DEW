import sys, json
from flask import request
from flask_restplus import Resource
from DEWAPI.api.common.serializers import *
from DEWAPI.api.common.fileupload_parser import parser, upload_parser
from DEWAPI.api.restplus import api
from ..services.hlbServices import HLBService
from ..services.nlpServices import NLPService
from ..services.experiment_manager import ExperimentManager
from ..services.dew_parser import DEWParser
from ..services.token_manager import TokenManager
from ..services.profileService import ProfileService
from ..services.sshConnectivity import SSHConnection
from ..services.deterlab_user_experiment_mapping import DeterLabExperimentMapper
from DEWAPI.user import userObj
import globals



ns = api.namespace('v1/pr', description='Private operations require authentication.')

hlb = HLBService()
nlp = NLPService()
em = ExperimentManager()
dew_parser = DEWParser()
tm = TokenManager()
ps = ProfileService()
dm = DeterLabExperimentMapper()

@ns.route('/hlb/translate/<string:format>')
class HandleHLBTranslator(Resource):
    # Return type is not necessary since we return everything to the client. The client can choose on how to display the information.
    @api.expect(translate_request)
    def put(self,format):
        """
            Takes a file as an input and returns the dew format
        """
        script = request.get_json(force=True)['Script']
        parsed_dew, scenarios, constraints, bindings, actor = hlb.HandleTranslator(format, script)

        return { 'dew': parsed_dew, 'scenarios': scenarios, 'constraints': constraints, 'bindings': bindings, 'actor': actor }

@ns.route('/hlb/parse')
class HandleHLBParser(Resource):

    @api.expect(parse_request)
    def put(self):
        """
          Take an input string (behavior) and return the actors, triggers, actions, emit events and wait times. This can be used for auto completing the actors list.
        """
        json_data = request.get_json(force=True)
        parsed_data = hlb.HandleParse(json_data)
        return parsed_data

@ns.route('/hlb/generateNs')
class HandleHLBGeneratorNs(Resource):

    @api.expect(ns_object)
    @api.representation('text/plain')
    def put(self):
        """
          Generates NS file for given behaviors, actors, and constraints
        """
        json_data = request.get_json(force=True)
        script = hlb.HandleNS(json_data)
        return {'script': script}

@ns.route('/hlb/generateBash')
class HandleHLBGeneratorBash(Resource):

    @api.expect(ns_object)
    @api.representation('text/plain')
    def put(self):
        """
          Generates BASH file for given behaviors, actors, and constraints
        """
        json_data = request.get_json(force=True)
        scriptList = hlb.HandleBASH(json_data)
        bashScriptDict = {}
        for i in range(len(scriptList)):
            if scriptList[i][0] not in bashScriptDict:
                if scriptList[i][1]:
                    bashScriptDict[scriptList[i][0]] = scriptList[i][1]
            else:
                if scriptList[i][1]:
                    bashScriptDict[scriptList[i][0]] += scriptList[i][1]

        return bashScriptDict

@ns.route('/hlb/suggestions')
class HandleHLBSuggestions(Resource):


    @api.expect(suggestion_object)
    def put(self):
        """
          Gets suggestions for given input
        """

        # TODO : Remove globals
        globals.actors=dict()
        globals.behaviors=dict()
        globals.constraints=dict()
        globals.events=dict()
        globals.actions=dict()
        json_data = request.get_json(force=True)
        print(len(json_data['suggestion_for']))
        if json_data["type"] == "behavior":
          s, t = hlb.HandleBehaviorSuggestions(json_data["behaviors"], json_data['actors'], json_data['suggestion_for'])
          return { 'suggestions': s, 'suggestion_text': t}
        elif json_data["type"] == "constraint":
          s, t = hlb.HandleConstraintSuggestions(json_data["constraints"], json_data["actors"], json_data["suggestion_for"], json_data["behaviors"])
          return { 'suggestions': s, 'suggestion_text': t}
        else:
          pass

@ns.route('/hlb/dependency_graph/parse')
class HandleGraphParse(Resource):
    @api.expect(scenario_text)
    def put(self):
        """
          Parses scenario to help in building a graph
        """
        # TODO : Remove globals
        globals.actors = dict()
        globals.behaviors = dict()
        globals.constraints = dict()
        globals.events = dict()
        globals.actions = dict()
        json_data = request.get_json(force=True)
        scenarios = json_data['scenario']
        nodes, edges = hlb.HandleGraphParse(scenarios)
        return {"status": "success", "nodes": nodes, "edges": edges }

@ns.route('/hlb/topology/parse')
class HandleTopologyParse(Resource):
    @api.expect(topology_text)
    def put(self):
        """
          Parses scenario to help in building a graph
        """
        # TODO : Remove globals
        globals.actors = dict()
        globals.behaviors = dict()
        globals.constraints = dict()
        globals.events = dict()
        globals.actions = dict()
        json_data = request.get_json(force=True)
        scenarios = json_data['scenario']
        constraints = json_data['constraints']
        actors, lans, edges = hlb.HandleTopologyParse(scenarios, constraints)
        return {"status": "success", "actors": actors, "lans": lans, "edges": edges }

@ns.route('/nlp/behavior')
class HandleNLPTranslator(Resource):

    @api.expect(nlp_text)
    def put(self):
        """
          Get the actors, behaviors and constraints for a given string of text parsed using NLP.
        """
        nlp_text = request.get_json(force=True)['text']
        response = nlp.HandleNLPString(nlp_text)
        print(response)
        return response


@ns.route("/persist/save_drive")
class HandleExperimentPushToDrive(Resource):

    @api.expect(push_to_drive_data)
    def put(self):
        """
            Save and push to drive
        """
        content = request.get_json(force=True)
        userId = userObj.getUserId()
        actors = content['actors']
        constraints = content['constraints']
        behaviors = content['behaviors']
        bindings = content['bindings']
        create_new_file = content['create_new_file']
        token = content['token']
        experimentId = None
        if 'id' in content:
            experimentId = content['id']
        name = content['name']
        description = content['description']

        experiment_content = json.dumps(
            {'actors': actors, 'constraints': constraints, 'behaviors': behaviors, 'bindings': bindings})

        if experimentId is None or experimentId.strip() == '':
            try:
                experiment = em.create_experiment(userId, experiment_content, experimentId, name, description)
                print(experiment.to_dict())
                res = em.push_to_drive(experiment_id=experiment.experiment_id, current_user_id=userId, token=token,
                                 create_new_file=create_new_file)
            except ValueError as e:
                msg = {'saved': False, 'message': str(e)}
                return msg, 403
            if res:
                return {'saved': True, 'message': "Successful"}

        else:
            try:
                flag, message, experiment = em.update_experiment(experimentId, userId, name=name, description=description,
                                                     content=experiment_content)
                em.push_to_drive(experiment_id=experimentId, current_user_id=userId, token=token,
                                 create_new_file=create_new_file)
                return {'saved': flag, 'message': message}
            except ValueError as e:
                msg = {'saved': False, 'message': str(e)}
                return msg, 403


@ns.route('/persist/save')
class HandleExperimentSave(Resource):

    @api.expect(persist_data)
    def put(self):
        """
          Save content to database
        """
        content = request.get_json(force=True)
        userId = userObj.getUserId()
        actors = content['actors']
        constraints = content['constraints']
        behaviors = content['behaviors']
        bindings = content['bindings']
        experimentId = None
        if 'id' in content:
          experimentId = content['id']
        name = content['name']
        description = content['description']
        driveId = content['driveId']
        print("driveId: ", driveId)
        experiment_content = json.dumps({'actors': actors, 'constraints': constraints, 'behaviors': behaviors, 'bindings': bindings})
        print("Experiment : ", json.loads(json.dumps({'actors': actors, 'constraints': constraints, 'behaviors': behaviors, 'bindings': bindings},ensure_ascii=False)))

        if experimentId is None or experimentId.strip() == '':
          experiment = em.create_experiment(userId, experiment_content,experimentId,name,description)
          if experiment is not None:
              return {'saved': True,'message':"Successful", "experiment": experiment.response_dict() }
            
        else: 
          try:
            flag , message, experiment = em.update_experiment(experimentId,userId,name=name, description=description,content=experiment_content,driveId=driveId)
            return {'saved': flag,'message':message, 'experiment': experiment.response_dict() }
          except ValueError as e:
            msg = {'saved': False, 'message': str(e)}
            return msg, 403

         # persistence.services.sqlite3.query_db("select id from users where username="+username,one=True)
         # return 
        # print(str(content))
        # return response


@ns.route("/persist/getExperimentList")
class HandleExperimentListRetrieval(Resource):
    
    def get(self):
        """
            Retrieve content from database
        """

        token = userObj.getToken()
        experiment = em.get_accessible_experiments(userObj.getUserId())
        result = []
        if experiment is not None:
            result=experiment
        
        return result

@ns.route("/persist/getExperimentById")
class HandleSingleExperimentRetrieval(Resource):
    @api.expect(experiment_detail)
    def post(self):
        """
            Retrieve content from database by experiment id and userId
        """
        
        content = request.get_json(force=True)
        userId = userObj.getUserId()
        id1 = content['id']
        try:
            experiment = em.get_experiment(id1, userId)
            
            result = {}
            if experiment is not None:
                r = experiment.to_dict()
                result=json.loads(r['content'])
                result['name'] = r['name']
                result['description'] = r['description']
                result['driveId'] = r['driveId']
                return result
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403


@ns.route("/persist/experiment/delete")
class HandleExperimentDelete(Resource):
  @api.expect(experiment_detail)
  def delete(self):
    """
      Delete experiment from database
    """
    content = request.get_json(force=True)
    userId = userObj.getUserId()
    experiment_id = content['id']
    
    try:
      em.soft_delete_experiment(userId, experiment_id)
      return None, 204
    except ValueError as e:
      if str(e) == "Forbidden":
        return {}, 403

@ns.route("/persist/experiment/removeaccess")
class HandleExperimentAccessRemoval(Resource):
  @api.expect(remove_access)
  def delete(self):
    """
      Delete experiment from database
    """
    content = request.get_json(force=True)
    userId = userObj.getUserId()
    experiment_id = content['id']
    userHandle= content['userHandle']
    try:
      em.soft_delete_access(userId, experiment_id,userHandle)
      return None, 200
    except ValueError as e:
      if str(e) == "Forbidden":
        return {}, 403

@ns.route("/persist/experiment/versions")
class HandleExperimentVersions(Resource):
    @api.expect(experiment_detail)
    def post(self):
        """
          Get versions of experiment from database
        """
        content = request.get_json(force=True)
        userId = userObj.getUserId()
        experiment_id = content['id']
        versions = em.get_experiment_versions(experiment_id, userId)

        try:
            return { "status": "success", "versions": versions}
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route("/export/dew")
class HandleExportToDEW(Resource):
    @api.expect(experiment_detail)
    def put(self):
        """
        Get experiment in DEW format
        """
        content = request.get_json(force=True)
        userId = userObj.getUserId()
        try:
            dew_content = em.dew_content(content['id'], userId)
            result = {}
            result['status'] = True
            result['dew_content'] = dew_content
            return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route("/persist/experiment/copy")
class HandleExperimentCopy(Resource):
  @api.expect(experiment_detail)
  def post(self):
    """
      Duplicate the experiment
    """
    content = request.get_json(force=True)
    userId = userObj.getUserId()
    experiment_id = content['id']
    
    try:
      experiment = em.get_experiment(experiment_id, userId)
      copied_experiment = em.copy_experiment(experiment, userId).to_dict()
      result = {}
      result['status'] = True
      result['experiment_id'] = copied_experiment['id']
      return result, 201
    except ValueError as e:
      if str(e) == "Forbidden":
        return {}, 403

@ns.route("/persist/experiment/grantaccess")
class HandleExperimentAccess(Resource):
  @api.expect(grantaccess)
  def post(self):
    """
     Grant experiment access
    """
    content = request.get_json(force=True)
    userId = userObj.getUserId()
    userHandle = content['userHandle']
    experiment_id = content['id']
    accessLevel = content['accessLevel']
    try:
      if int(accessLevel)>0 and int(accessLevel)<=4:
        result = em.grantExperimentAccess(experiment_id, userId,userHandle,accessLevel)
      else:
        result = {'error':'Invalid Access Level'}
      return result, 200
    except ValueError as e:
      if str(e) == "Forbidden":
        return {}, 403

@ns.route("/persist/experiment/control")
class HandleExperimentControl(Resource):
  @api.expect(experiment_detail)
  def post(self):
    """
     Grant experiment Control
    """
    content = request.get_json(force=True)
    userId = userObj.getUserId()
    experiment_id = content['id']
    
    try:
      result = em.getExperimentControlInfoByUserId(experiment_id, userId)
      return result, 200
    except ValueError as e:
      if str(e) == "Forbidden":
        return {}, 403

@ns.route('/persist/getUserAccessList/')
class HandleExperimentUserControlList(Resource):
    @api.expect(userAccessListModel)
    def post(self):
        json_data = request.get_json(force=True)
        return em.getUserAccessList(userObj.getUserId(),json_data['experiment_id'])

@ns.route('/upload/dew')
class HandleUploadParser(Resource):

    @api.expect(upload_parser)
    def put(self):
        """
          Get the actors, behaviors and constraints for a given string of text parsed using NLP.
        """
        uploaded_file = upload_parser.parse_args()['file']
        content = uploaded_file.read()
        x = dew_parser.get_behaviors_and_constraints(content.decode("utf-8"))

        # This section is being done to extract the bindings category as
        # only the key and values are stored in dew file

        # Creating data dictionary to send to the parser api
        data = {
            'ParseType': 'bash',
            'Scenario': x['behaviors'],
            'Constraints': [],
        }
        parsed_data = hlb.HandleParse(data)

        # copy into another variable
        bindings_copy = x['bindings']

        # define function to flatten lists
        def flatten(lst):
            lst = [a for a in lst if a is not None]
            return [item for sublist in lst for item in sublist]

        # Get all actions, events and unknowns
        all_actions = flatten([x[2] for x in parsed_data['parsedScenario']])
        all_events = flatten([x[3] for x in parsed_data['parsedScenario']])

        formatted_bindings = []
        for val in bindings_copy:
            if val[0] in all_actions:
                formatted_bindings.append({
                    'category': 'action',
                    'key': val[0],
                    'value': val[1]
                })
            elif val[0] in all_events:
                formatted_bindings.append({
                    'category': 'event',
                    'key': val[0],
                    'value': val[1]
                })
            else:
                formatted_bindings.append({
                    'category': 'unknown',
                    'key': val[0],
                    'value': val[1]
                })
        x['bindings'] = formatted_bindings
        return x

@ns.route('/token-based-auth/create')
class HandleTokenBasedAuthCreateToken(Resource):
    @api.expect(token_data)
    def post(self):
        """
        Create token for a given experiment
        """
        content = request.get_json(force=True)
        experiment_id = content['experiment_id']
        access_level = content['access_level']
        creator_uid = userObj.getUserId()

        try:
            token = tm.create_token(experiment_id, access_level, creator_uid)
            return token, 201
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403


@ns.route('/token-based-auth/getTokenList')
class HandleTokenBasedAuthTokenList(Resource):
    @api.expect(tokenListModel)
    def post(self):
        """
        Create token for a given experiment
        """
        content = request.get_json(force=True)
        experiment_id = content['experiment_id']
        creator_uid = userObj.getUserId()

        try:
            result = []
            tokenList = tm.getTokenList(experiment_id, creator_uid)
            for t in tokenList:
                obj = {}
                obj['token'] = t['token']
                obj['accessLevel'] = t['access_level']
                obj['status'] = t['active']
                result.append(obj)
            return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403



@ns.route('/profile/accounts/deterLab/save')
class HandleProfileDeterLabSaveAccounts(Resource):
    @api.expect(deterlab_user_details)
    def post(self):
        """
        Create token for a given experiment
        """
        content = request.get_json(force=True)
        username = content['username']
        password = content['password']
        creator_uid = userObj.getUserId()
        print(creator_uid)
        try:
            result = ps.save(creator_uid, username, password)
            return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403


@ns.route('/profile/accounts/deterLab/get')
class HandleProfileDeterLabGetAccounts(Resource):
    def get(self):
        """
        Create token for a given experiment
        """
        creator_uid = userObj.getUserId()

        try:
            result = ps.get(creator_uid)
            return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/profile/accounts/deterLab/delete')
class HandleProfileDeterLabDeleteAccounts(Resource):
    def delete(self):
        """
        Create token for a given experiment
        """
        creator_uid = userObj.getUserId()

        try:
            result = ps.delete(creator_uid)
            return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/deterlab/project/exists')
class HandleDeterLabProjectExists(Resource):
    @api.expect(deterlab_project_name)
    def post(self):
        content = request.get_json(force=True)
        projectName = content['projectName']
        creator_uid = userObj.getUserId()

        try:
            details = ps.get(creator_uid)
            if str(details['username']).strip() !='' and str(details['password']).strip() !='':
              ssh = SSHConnection(details['username'],details['password'])
              result = ssh.isProjectExists(projectName)
            else:
              result = {'error':'username or password doesnot exists'}
            return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/deterlab/experiment/exists')
class HandleDeterLabExperimentExists(Resource):
    @api.expect(deterlab_experiment_details)
    def post(self):
        content = request.get_json(force=True)
        projectName = content['projectName']
        experimentName = content['experimentName']
        creator_uid = userObj.getUserId()

        try:
            details = ps.get(creator_uid)
            if str(details['username']).strip() !='' and str(details['password']).strip() !='':
              ssh = SSHConnection(details['username'],details['password'])
              result = ssh.isExperimentExists(projectName,experimentName)
            else:
              result = {'error':'username or password doesnot exists'}
            return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/deter/project/getnsfile')
class HandleDeterGetNsFileContent(Resource):
    def get(self):
        eid = request.args.get('eid')
        uid = userObj.getUserId()
        try:
          result = {}
          if not dm.user_can(uid,eid):
            result['error'] = "User does not have access to this experiment"
          else: 
            details = ps.get(uid)
            
            if str(details['username']).strip() !='' and str(details['password']).strip() !='':
              ssh = SSHConnection(details['username'],details['password'])
              mapping = dm.getMapping(details['id'],eid)
              if 'error' not in mapping:
                result = ssh.getFileContent(mapping['project_name'],mapping['experiment_name'])
              else:
                result = mapping
            else:
              result = {'error':'username or password doesnot exists'}
              
          return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403
        

@ns.route('/deter/userlist')
class HandleDeterUserList(Resource):
    def get(self):
        uid = userObj.getUserId()
        try:
          result = ps.getUserList(uid)
          return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/deter/project')
class HandleProjectMapping(Resource):
    def get(self):
        eid = request.args.get('eid')
        uid = userObj.getUserId()
        try:
          result = {}
          if not dm.user_can(uid,eid):
            result['error'] = "User does not have access to this experiment"
          else: 
            details = ps.get(uid)
            result = dm.getMapping(details['id'],eid)
          return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/deter/add/project/mapping')
class HandleAddProjectMapping(Resource):
    @api.expect(deterlab_experiment_mapping_details)
    def post(self):
        content = request.get_json(force=True)
        projectName = content['projectName']
        experimentName = content['experimentName']
        eid = content['experimentId']
        uid = userObj.getUserId()
        try:
          result = {}
          if not dm.user_can(uid,eid):
            result['error'] = "User does not have access to this experiment"
          else: 
            details = ps.get(uid)
            
            if str(details['username']).strip() !='' and str(details['password']).strip() !='':
              experiment = em.get_experiment(eid, uid)
              script = hlb.HandleNS(json.loads(experiment.content))
              ssh = SSHConnection(details['username'],details['password'])
              result = ssh.createExperimentIfNotExistOnDeterLab(projectName,experimentName,script)
              if 'error' not in result:
                result = dm.createOrModifyMapping(details['id'],eid,projectName,experimentName)
            else:
              result = {'error':'username or password doesnot exists'}
          return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/deter/project/getactivity')
class HandleGetActivity(Resource):
    def get(self):
        eid = request.args.get('eid')
        uid = userObj.getUserId()
        try:
          result = {}
          if not dm.user_can(uid,eid):
            result['error'] = "User does not have access to this experiment"
          else: 
            details = ps.get(uid)
            
            if str(details['username']).strip() !='' and str(details['password']).strip() !='':
              ssh = SSHConnection(details['username'],details['password'])
              mapping = dm.getMapping(details['id'],eid)
              if 'error' not in mapping:
                result = ssh.getActivityLogOfExperiment(mapping['project_name'],mapping['experiment_name'])
              else:
                result = mapping
            else:
              result = {'error':'username or password doesnot exists'}
              
          return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/deter/project/getstatus')
class HandleGetStatus(Resource):
    def get(self):
        eid = request.args.get('eid')
        uid = userObj.getUserId()
        try:
          result = {}
          if not dm.user_can(uid,eid):
            result['error'] = "User does not have access to this experiment"
          else: 
            details = ps.get(uid)
            
            if str(details['username']).strip() !='' and str(details['password']).strip() !='':
              ssh = SSHConnection(details['username'],details['password'])
              mapping = dm.getMapping(details['id'],eid)
              if 'error' not in mapping:
                result = ssh.getExperimentStatusInformation(mapping['project_name'],mapping['experiment_name'])
              else:
                result = mapping
            else:
              result = {'error':'username or password doesnot exists'}
              
          return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/deter/project/swap')
class HandleGetStatus(Resource):
    def get(self):
        eid = request.args.get('eid')
        swapModeString = request.args.get('mode')
        if swapModeString is None or (swapModeString.lower() != 'swapin' and swapModeString.lower() != 'swapout'):
          return "Please select a mode, either 'swapin' or 'swapout'",200
        if swapModeString.lower() == 'swapin':
          swapmode = 'in'
        else:
          swapmode = 'out'
        uid = userObj.getUserId()
        try:
          result = {}
          if not dm.user_can(uid,eid):
            result['error'] = "User does not have access to this experiment"
          else: 
            details = ps.get(uid)
            
            if str(details['username']).strip() !='' and str(details['password']).strip() !='':
              ssh = SSHConnection(details['username'],details['password'])
              mapping = dm.getMapping(details['id'],eid)
              if 'error' not in mapping:
                result = ssh.swap(mapping['project_name'],mapping['experiment_name'],swapmode)
              else:
                result = mapping
            else:
              result = {'error':'username or password doesnot exists'}
              
          return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403

@ns.route('/deter/update/project/nsfile')
class HandleUpdateProjectNSFile(Resource):
    def get(self):
        eid = request.args.get('eid')
        uid = userObj.getUserId()
        try:
          result = {}
          if not dm.user_can(uid,eid):
            result['error'] = "User does not have access to this experiment"
          else: 
            details = ps.get(uid)
            
            if str(details['username']).strip() !='' and str(details['password']).strip() !='':
              
              mapping = dm.getMapping(details['id'],eid)
              if 'error' not in mapping:
                experiment = em.get_experiment(eid, uid)
                script = hlb.HandleNS(json.loads(experiment.content))
                ssh = SSHConnection(details['username'],details['password'])
                result = ssh.updateProjectNsfile(mapping['project_name'],mapping['experiment_name'],script)
              else:
                result = mapping
            else:
              result = {'error':'username or password doesnot exists'}
          return result, 200
        except ValueError as e:
            if str(e) == "Forbidden":
                return {}, 403