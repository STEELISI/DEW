from flask_restplus import fields
from DEWAPI.api.restplus import api

nlp_text = api.model('NLP input', {
  'text': fields.String(description='The text to be parsed by the NLP')
})

ns_object = api.model('NS object', {
  'actors': fields.List(fields.String, description="Actors involved"),
  'behaviors': fields.List(fields.String, description="Behaviors"),
  'constraints': fields.List(fields.String, description="Constraints"),
  'bindings': fields.List(fields.String, description="Bindings")
})

parse_request = api.model('Parser object', {
  'ParseType': fields.String(enum=['bash', 'magi', 'go'], description="type of script to be parsed"),
  'Scenario': fields.List(fields.String, description="Scenario"),
  'Constraints': fields.List(fields.String, description="Constraints")
})

translate_request = api.model('Translate request', {
  'Script': fields.String(description="Content of the script to be translated, script type could be bash, magi, and go")
})

suggestion_object = api.model('Suggestion v1 request', {
  'type': fields.String(description="Type of suggestions required",required=True, enum=['behavior', 'constraint']),
  'suggestion_for': fields.String(description="Partial string for which suggestion is required"),
  'behaviors': fields.List(fields.String, description="List of behaviors to make suggestions"),
  'constraints': fields.List(fields.String, description="List of constraints to make suggestions"),
  'actors': fields.List(fields.String, description="List of actors to make suggestions")
})

persist_data = api.model('Save request', {
  'name':fields.String(description="Name of experiment", required=True),
  'id':fields.String(description="Id of experiment", required=False),
  'description':fields.String(description="Description of experiment", required=True),
  'behaviors': fields.List(fields.String, description="List of behaviors", required=True),
  'constraints': fields.List(fields.String, description="List of constraints", required=True),
  'actors': fields.List(fields.String, description="List of actors", required=True),
  'bindings': fields.List(fields.String, description="List of bindings", required=True),
  'driveId': fields.String(description="File id of gogole drive", required=False),
  })

push_to_drive_data = api.model('Save request', {
  'name':fields.String(description="Name of experiment", required=True),
  'id':fields.String(description="Id of experiment", required=False),
  'description':fields.String(description="Description of experiment", required=True),
  'behaviors': fields.List(fields.String, description="List of behaviors", required=True),
  'constraints': fields.List(fields.String, description="List of constraints", required=True),
  'actors': fields.List(fields.String, description="List of actors", required=True),
  'bindings': fields.List(fields.String, description="List of bindings", required=True),
  'create_new_file': fields.Boolean(description="Create a new file in drive", default=False),
  'token': fields.String(description='Token used to authorize google apis', required=True)
  })

experiment_detail = api.model('get experiment request', {
  'id':fields.String(description="Id of experiment", required=True)
  })
grantaccess = api.model('Grant experiment access', {
  'userHandle': fields.String(description="user id", required=True),
  'id':fields.String(description="Id of experiment", required=True),
  'accessLevel':fields.String(description="Access level read,write or manage", required=True)
  })

remove_access = api.model('Remove experiment access', {
  'userHandle': fields.String(description="user id", required=True),
  'id':fields.String(description="Id of experiment", required=True)
  })
suggestion_v2_object = api.model('Suggestion v2 request',{
  'username': fields.String(description="Username", required=True),
  'type': fields.String(description="Type of suggestions required",required=True, enum=['behavior', 'constraint']),
  'suggestion_for': fields.String(description="Partial string for which suggestion is required")
})

user_object = api.model('User information request',{
  'token': fields.String(description="token", required=True),
})
user_handle = api.model('User handle verification',{
  'handle': fields.String(description="handle", required=True),
})

register_user_handle = api.model('Register a new user ',{
  'token': fields.String(description="token", required=True),
  'handle': fields.String(description="handle", required=True),
})

token_data = api.model('Create token object',{
  'experiment_id': fields.String(description="experiment id for which the token is to be created", required=True),
  'access_level': fields.String(description="Access level allowed", required=True, enum=['read', 'write'])
})

tokenListModel = api.model('Get List of all tokens',{
  'experiment_id': fields.String(description="experiment id for which the token is to be created", required=True)
})

userAccessListModel = api.model('Get List of all access',{
  'experiment_id': fields.String(description="experiment id", required=True)
})

token_data_small = api.model('Toggle token object',{
  'experiment_id': fields.String(description="experiment id for which the token is to be created", required=True),
  'token': fields.String(description="Auth token to be toggled", required=True)
})


uid_header_parser = api.parser()
uid_header_parser.add_argument('X-user-id',location='headers')

experiment_update_by_token = api.model('Experiment object update by token', {
  'name':fields.String(description="Name of experiment", required=True),
  'description':fields.String(description="Description of experiment", required=True),
  'behaviors': fields.List(fields.String, description="List of behaviors",required=True),
  'constraints': fields.List(fields.String, description="List of constraints",required=True),
  'actors': fields.List(fields.String, description="List of actors",required=True),
  'bindings': fields.List(fields.String, description="List of bindings",required=True)
})
