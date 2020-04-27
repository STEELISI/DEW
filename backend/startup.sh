#!/usr/bin/env bash
alembic upgrade head
service nginx start
python ./run.py
# uwsgi --ini uwsgi.ini
