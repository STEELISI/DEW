# Basics

This guide provides a quick introduction to Distributed Experiment Workflows (DEW).


## What is DEW?

DEW is an attempt to encode behavior and toplogical constraints which help with realization on testbeds. DEW consists of 3 major components. They are Actors, Scenario/Behavior, Constraints, and Bindings.

DEW helps users encode behavior of an experiment, and uses that encoding to generate topology and runnable scripts. DEW representation has three major components: scenario, constraints and bindings.

## Scenario

Scenario defines the behavior of the the experiment. Each statement consists of the action (command or script being executed) and the actor (the machine or identical group of machines executing the action).

To enforce the order of execution of actions, we use events. An actor can emit one or more events (e.g., when an action is completed). We use the emit keyword for this. Similarly, an actor can wait for one for more events to perform an action. The when keyword is used for this.

A user may also want to wait for a certain amount of time before executing an action. For this purpose, the wait keyword is used. It accepts either a number or a variable, which can be filled later.

Sometimes, we may have multiple instances of an actor and we need to define whether to wait for events from all instances or just any instance. Hence, we add ALL or ANY keyword before the events.
The syntax of a DEW statement looks like:

```
[when [ALL/ANY] <events>][wait <time>] actor action [emit <events>]
```
(The parts enclosed in square brackets are optional.)

It is also possible to provide labels by starting the line with `@`. With multiple labels, each label will have its own script when exported. We also support C++ style line comments `//` as well.

### Labels
Labels are **user defined keywords** which help in splitting the scenario into multiple phases. Labels help in generating multiple scripts for the scenario with each file name being the label provided. This helps the user in making multiple iterations quickly without running everything from scratch.

For example, say you have to install `wget` and then run a script which uses `wget`. By using labels, we can create two scripts - an installation script and a test script (which you obtain on exporting to bash). The DEW scenario can look something like 
```
@ install
server install_wget_dependencies
server install_wget

@ test
server run_wget_script
```

Upon exporting to bash, you get two scripts - `install.sh` and `test.sh` 
Now, the user can run `install.sh` once and focus on the execution of `test.sh`. If it was a single script, the user must wait till the installation is finished everytime it is run.


## Constraints

Constraints section defines how actors should be realized on a testbed, i.e., it describes topological constraints for actors. If no constraints are specified all actors will be materialized in a disconnected topology, with a default OS.

### os
OS Constraint defines the operating system of the actor. The format of the constraint is 
```
os actor os_name
```

### num
num constraint defines the number of instances of an actor. The format of the constraint is
```
num actor number_of_instances
```
### link
Link constraint denotes that there is a link between two actors. If there are multiple number of instances, you need to define the keyword `ALL` or `ANY` to indicate whether all instances need to be linked or any instance needs to be linked.
 The format of the constraint is
```
link [ALL/ANY] actor1 [ALL/ANY] actor2
```

### lan

LAN constraint creates a LAN between specified actors. The format of the statement is

```
lan actor [actor] ...
```

## Bindings

Bindings provide the actual commands to be run on the nodes in the experiment to achieve actions and to detect events. 


## DEW file format

The DEW file format consists of text statements, with each component (scenario, bindings, constraints) starting with its label within square brackets. The format is:

```
[Scenario]
<scenario_statements>

[Bindings]
<bindings>

[Constraints]
<constraint_statements>
```
We also support inner labels in the scenario section. These labels will correspond to separate BASH scripts if you export your DEW specification as BASH scripts. The inner labels start with `@` character.

```
[Scenario]
@setup
<setup_scenario_statements>
@execute
<execute_scenario_statements>
@cleanup
<cleanup_scenario_statements>
```

## Benefits

* Robust design - DEW format helps testbed users design an experiment at a high level, and in a flexible manner. It is easy to replace some pieces (e.g., which traffic generator to use) with others, and to scale the experiment up. 
* History - DEW portal keeps a history of all changes in the experiment, which helps restore to a particular version when things go wrong
* Sharing and reuse - Since experiments can be shared, multiple researchers can collaborate on a single experiment. DEW experiments can also be published for anyone to use (by choosing the link sharing option).

