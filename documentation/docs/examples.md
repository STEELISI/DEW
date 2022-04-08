# Examples

This page contains DEW file contents of various experiments.

## Parallel Ping

```
[Scenario]
client pingServer
server pingClient

[Bindings]
pingServer = ping -c 10 server
pingClient = ping -c 10 client

[Constraints]
link client server
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/JNOLuf4gwUc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

## Sequential Ping

```
[Scenario]
client pingServer emit clientRunpingServerSig
when clientRunpingServerSig server pingClient 

[Bindings]
pingServer = ping -c 1 server
pingClient = ping -c 1 client
clientRunpingServerSig = psuccess(pingServer)

[Constraints]
link server client
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/5q8fAJtRyUA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>

## Complex Experiment

```
[Scenario]
server installiperf1 emit sdone
client installiperf2 emit cdone
when sdone, cdone server startServer emit ssdone
when ssdone client startClient

[Bindings]
installiperf1 = sudo apt-get install iperf -y
sdone = psuccess(installiperf1) 
installiperf2 = sudo apt-get install iperf -y
cdone = psuccess(installiperf2)
startServer = iperf -s
ssdone = pexists(startServer)
startClient = iperf -c server -t $time

[Constraints]
link server client
```