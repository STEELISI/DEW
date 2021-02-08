#!/bin/bash

python3 -m pip install --user --upgrade twine
rm -rf dist/*
python3 setup.py sdist bdist_wheel
twine upload dist/*
