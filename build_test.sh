#!/usr/bin/env bash

# change test1 to test2 or test3 to get the script for test2 or test3

echo "Building frontend..."
cd /home/ubuntu/dew/test1
cd DEW/frontend
npm install
npm run prod

echo "Building documentation..."
cd /home/ubuntu/dew/test1
cd DEW/documentation
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
mkdocs build

echo "Building backend..."
cd /home/ubuntu/dew/test1
cd DEW/backend
make deploy_test1

echo "Reloading nginx..."
sudo service nginx reload