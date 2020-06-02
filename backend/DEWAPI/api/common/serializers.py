from flask_restplus import fields
from DEWAPI.api.restplus import api

blog_post = api.model('Blog post', {
    'id': fields.Integer(readOnly=True, description='The unique identifier of a blog post'),
    'title': fields.String(required=True, description='Article title'),
    'body': fields.String(required=True, description='Article content'),
    'pub_date': fields.DateTime,
    'category_id': fields.Integer(attribute='category.id'),
    'category': fields.String(attribute='category.name'),
})

pagination = api.model('A page of results', {
    'page': fields.Integer(description='Number of this page of results'),
    'pages': fields.Integer(description='Total number of pages of results'),
    'per_page': fields.Integer(description='Number of items per page of results'),
    'total': fields.Integer(description='Total number of results'),
})

page_of_blog_posts = api.inherit('Page of blog posts', pagination, {
    'items': fields.List(fields.Nested(blog_post))
})

category = api.model('Blog category', {
    'id': fields.Integer(readOnly=True, description='The unique identifier of a blog category'),
    'name': fields.String(required=True, description='Category name'),
})

category_with_posts = api.inherit('Blog category with posts', category, {
    'posts': fields.List(fields.Nested(blog_post))
})

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
  'userId': fields.String(description="user id", required=True),
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
  'userId': fields.String(description="user id", required=True),
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
  'userId': fields.String(description="user id", required=True),
  'id':fields.String(description="Id of experiment", required=True)
  })
grantaccess = api.model('Grant experiment access', {
  'userId': fields.String(description="user id", required=True),
  'userHandle': fields.String(description="user id", required=True),
  'id': fields.String(description="Id of experiment", required=True)
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
  'access_level': fields.String(description="Access level allowed", required=True, enum=['read', 'write']),
  'creator_uid': fields.String(description="uid of creator", required=True),
})

tokenListModel = api.model('Get List of all tokens',{
  'experiment_id': fields.String(description="experiment id for which the token is to be created", required=True),
  'creator_uid': fields.String(description="uid of creator", required=True),
})

userAccessListModel = api.model('Get List of all access',{
  'experiment_id': fields.String(description="experiment id", required=True),
  'userId': fields.String(description="uid of creator", required=True),
})

token_data_small = api.model('Toggle token object',{
  'experiment_id': fields.String(description="experiment id for which the token is to be created", required=True),
  'token': fields.String(description="Auth token to be toggled", required=True),
  'current_uid': fields.String(description="uid of current user", required=True),
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