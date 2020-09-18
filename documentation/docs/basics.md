# Basics

This guide provides a quick introduction to Distributed Experiment Workflows (DEW).

## What is DEW?

DEW is an attempt to encode behavior and toplogical constraints which help with realization on testbeds. DEW consists of 3 major components. They are Actors, Scenario/Behavior, Constraints, and Bindings.

## Actors

Actors are the different types of machines where the experiment is run.

## Scenario/Behavior

Scenario defines the behavior of the components of the experiment. They consist of the action(command or script being executed) and the actor(the machine or component executing the action).

To ensure the order of execution of actions, we use events. An actor emits one or more events when an action is completed. We use the `emit` keyword for this. Similarly, an actor waits for one for more events to perform an action. The `when` keyword is used for this.

Sometimes, we may have multiple instances of an actor and we need to define whether to wait for events from all instances or any instance. Hence, we add `ALL` or `ANY` keyword before the events.

We may also sometimes need to wait for a certain amount of time before executing an action. For this purpose, the `wait` keyword is used. It accepts either a number or a variable which can be filled later.

Hence, a statement in scenario will look like 
```
[when [ALL/ANY] <events>][wait <time>] actor action [emit <events>]
```
(The parts enclosed in square brackets are optional.)

## Constraints

Constraints define the constraints for a single or a group of actors. There are seven different types of constraints allowed. They are

### os
OS helps us define the operating system of the actor. The format of the constraint is 
```
os actor os_name
```

### num
num constraint defines the number of instances of an actor. The format of the constraint is
```
num actor number_of_instances
```
### link
link adds a link between two actors. If there are multiple number of instances, you need to define the keyword `ALL` or `ANY` to indicate whether all instances need to be linked or any instance needs to be linked.
 The format of the constraint is
```
link [ALL/ANY] actor1 [ALL/ANY] actor2
```

### lan

Add a particular actor to a LAN network.
```
lan actor lan_name
```
**Check this**.

### interfaces

**Yet to add**

### location

**Yet to add**

### nodetype

**Yet to add**


## Bindings

Bindings provide a mapping for actions or events and the scripts or commands. In the DEW file, the key and value of mappings are separated by space.

## DEW file format

The DEW file format consists of each section defined inside square brackets. The format is 
```
[Scenario]
<scenario_statements>

[Bindings]
<bindings>

[Constraints]
<constraint_statements>
```

## Benefits

* Robust design - DEW helps the researcher to think about dependencies and ordering and having a more robust design

* History - DEW keeps a history of all changes in the experiment which helps in restoring to a particular version when things go wrong

* Sharing and reuse - Since experiments can be shared, multiple researchers can collaborate on a single experiment.

