#!/usr/bin/env bash
service nginx start
python /app/run.py
# uwsgi --ini uwsgi.ini
