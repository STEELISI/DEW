# Suggestions for bindings

As part of DEW, we provide suggestions for action and event bindings. This page lists the different suggestions provided by DEW.

## Action Binding Suggestions
The suggestions for action bindings are - 

|Suggestion|
|---|
| `tcpdump -i expeth($node) -w $file` |
| `ping $node` |
| `iperf -s` |
| `iperf -c $node` |
| `nmap $node` |
| `wget $node` |
| `dig $name` |
| `start_apache` |
| `start_bind` |

## Event Binding Suggestions
The suggestions for event bindings are

|Suggestion| Description|
|:---:|:---|
|`fexists($file) `| file exists|
|`fmod($file) `| file was modified|
|`pexists($action) `| process exists that performs action in the binding|
|`psuccess($action) `| process completed w success for the given action|


## Built in functions

We have also provided some built-in functions in `Ubuntu-EDU` OS image on Deterlab. If you use that image you can use the following built-in functions in your bindings, and we will resolve them automatically.

| Built-in function |   Description   |
|:---:|:---|
|`expIP` | experimental IP on the given node|
|`ctlIP` | control IP on the given node|
|`expeth` | experimental iface on the given node|
|`ctleth` | control iface on the given node|
|`expIP($n)` | experimental IP on the given node, leading |to node $n
|`expeth($n)` | experimental iface on the given node, |leading to node $n
|`proj` | project name|
|`exp` | experiment name|
|`node` | node name|
|`epoch` | current time in epoch format|
