#!/usr/bin/env bash

# change PORTS as per environment
# 4000 - prod
# 6100 - test1
# 6200 - test2
# 6300 - test3

echo "Building frontend..."

cd frontend
npm install
npm run prod
cd ..

echo "Building documentation..."

cd documentation
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
mkdocs build
cd ..

echo "Building backend..."
cd backend
make deploy PORT=6100
cd ..

echo "Reloading nginx..."
sudo service nginx reload