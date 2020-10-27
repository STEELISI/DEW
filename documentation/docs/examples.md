# Examples

This page contains DEW file contents of various scenarios.

View video tutorials on simple experiments here - 
<iframe width="560" height="315" src="https://www.youtube.com/embed/JNOLuf4gwUc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/5q8fAJtRyUA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Iperf on two nodes

```
[Scenario]
// Install iPerf on two nodes and run them as server/client
// Run waits until iPerf is installed on both nodes
// Note that installation would be better if specified under a
// separate label, since it is a one-time operation.

a setup emit setup_done1
b setup emit setup_done2
when setup_done1, setup_done2 a send_traffic
when setup_done1, setup_done2 b receive_traffic

[Bindings]
setup = sudo apt-get install iperf -y
setup_done1 = psuccess(setup) - process completed w success for the given action
setup_done2 = psuccess(setup)
send_traffic = iperf -c b
receive_traffic = iperf -s

[Constraints]
link a b
```

## Ping nodes

```
[Scenario]
// Three nodes in a line. A pings B once. After that
// B pings C once

A runping1 emit Adone
when Adone B runping2

[Bindings]
runping1 = ping B -c 1
Adone = psuccess(runping1)
runping2 = ping C -c 1

[Constraints]
link A B
link B C
```

## Web server attack

```
[Scenario]
@setup
client installFlooder
server installApache
@run
server startServer emit serverStarted
when serverStarted client startAttack

[Bindings]
installFlooder = /share/education/TCPSYNFlood_USC_ISI/install-flooder
installApache = sudo apt-get install apache2 -y
startServer = sudo service apache2 start
serverStarted = pexists(apache2)
startAttack = sudo flooder --dst expIP(server) --src 1.1.1.0 --srcmask 255.255.255.0 --highrate 10000

[Constraints]
link client server
```

## Complex experiment

```
[Scenario]
@configure
server install_iperf
client install_iperf
client install_flooder
server install_tcpdump
@monitor
server start_measure emit mstarted
server start_server emit sstarted
@run
when mstarted, sstarted client start_traffic emit cstarted
when cstarted wait t1 attacker start_attack emit astarted
when astarted wait t2 attacker stop_attack emit astopped
when astopped wait t3 client stop_traffic emit cstopped
@analyze
when cstopped server stop_measure emit mstopped
when mstopped server calculate_entropy

[Bindings]
install_iperf = apt-get install iperf -y
install_flooder = /scripts/common/install_flooder.sh
install_tcpdump = apt-get install tcpdump -y
start_measure = tcpdump -i ETH(IP(server)) -w DUMP_OUTPUT
mstarted = pexists($action)
start_server = iperf -s
sstarted = pexists($action)
start_traffic = iperf -c IP(server)
cstarted = pexists($action)
start_attack = flooder --dst IP(server) --proto 6 —rate RATE
astarted = pexists($action)
stop_attack = pkill -9 flooder
astopped = psuccess($action)
stop_traffic = pkill -9 iperf
cstopped = psuccess($action)
stop_measure = pkill -9 tcpdump
mstopped = psuccess($action)
calculate_entropy = /scripts/entropy_calculator.sh ANALYSIS_OUTPUT

[Constraints]
server os Ubuntu-latest
attacker num 2
lan client attacker router
link router server

```