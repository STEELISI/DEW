sudo apt update
sudo apt install -y python-is-python3
sudo apt install -y rabbitmq-server
sudo systemctl enable --now rabbitmq-server
sudo rabbitmqctl add_user manager r@bbitmqWFMNG
sudo rabbitmqctl set_user_tags manager administrator
sudo rabbitmqctl set_permissions -p / manager ".*" ".*" ".*"
sudo rabbitmqctl add_user dew dew
sudo rabbitmqctl set_permissions -p / dew ".*" ".*" ".*"
pip install pika
sudo apt install sqlite3
touch /tmp/dew.db
sqlite3 /tmp/dew.db < createtable.sql
