#!/usr/bin/env bash
service nginx start
python /app/app.py
# uwsgi --ini uwsgi.ini
