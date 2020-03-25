#!/usr/bin/env bash
alembic upgrade head
service nginx start
python /app/run.py
# uwsgi --ini uwsgi.ini
