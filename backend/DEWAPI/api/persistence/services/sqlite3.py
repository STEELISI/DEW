import sqlite3
from flask import g

DATABASE = 'database.db'


def connect_db():
    return sqlite3.connect(DATABASE)


# @api.before_request
def before_request():
    g.db = connect_db()


# @api.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()


def query_many(query, args=(), one=False):
    g.db = connect_db()
    print("Running query - ", query, args)
    cur = g.db.executemany(query, args)
    g.db.commit()
    print(cur)
    rv = [dict((cur.description[idx][0], value) for idx, value in enumerate(row)) for row in cur.fetchall()]
    print(rv)
    
    teardown_request(None)
    return (rv[0] if rv else None) if one else rv

def query_db(query, args=(), one=False):
    # g.db = connect_db()

    g.db = connect_db()
    print("Running query - ", query, args)
    cur = g.db.execute(query, args)
    print(cur)
    rv = [dict((cur.description[idx][0], value) for idx, value in enumerate(row)) for row in cur.fetchall()]
    print(rv)
    teardown_request(None)
    return (rv[0] if rv else None) if one else rv


def update_experiment(experiment="",username=""):
    query = "update experiment set experiment = ? where username = ?"
    query_many(query, [(experiment,username)])
    return True

def find_experiment(username):
    query = "select * from experiment where username = ?"
    return query_db(query, (username,),one=True)

def create_experiment(experiment="",username=""):
    query = "insert into experiment(experiment, username) values(?,?)"
    query_many(query,[(experiment,username)])
    return True

def create_or_update_experiment(experiment="", username=""):
    previous_experiment = find_experiment(username)
    print(previous_experiment)
    if previous_experiment is None:
        create_experiment(experiment=experiment, username=username)
    else:
        update_experiment(experiment=experiment, username=username)
    return True

def create_experiment_table():
    query = "create table IF NOT EXISTS experiment(username varchar(255) primary key, experiment text)"
    g.db = connect_db()
    cur = g.db.execute(query)
    g.db.commit()
    teardown_request(None)

