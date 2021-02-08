# Experiment Model Intermediate Representation (XIR)

This is the repository for XIR. The format of the representation is described below. Installation instructions for language bindings are in the READMEs of their respective directories.

- [Python](lang/mx)
- [Go](lang/go)

# XIR

XIR is a json based intermediate representation for MergeTB experiments. XIR models contain two major components
- structural model
- behavioral model
where the topology of an experiment is captured in the structural model and the runtime execution of an experiment is captured in the behavioral model. The format of each of these models within XIR is described below.

The top level XIR has the following format

```javascript
{
  xpid: "experiment id",
  structure: {
    <experiment structural model goes here>
  },
  behavior: {
    <experiment behavioral model goes here>
  }
}
```

## Structure

The structural side of XIR is a very simple recursive network (network of networks) model.
The general schema is shown below.

```javascript
net:
 id: uuid
 nodes: [node]
 links: [link]
 nets:  [net]

node:
 id: uuid
 endpoints: [endpoint]
 props: {}

link:
 id: uuid
 endpoints: [[uuid],[uuid]]
 props: {}

endpoint:
 id: uuid
 props: {}
```

### Net

The net object is a recursive representation of a network. Each network is a collection of nodes, links and subnetworks. Every element in XIR is identified by a UUID.

### Node

The node object encapsulates a property map and a set of endpoints. Each endpoint can be connected to a link.

### Link

The link object encapsulates a property map and two sets of endpoints. This by having two sets of endpoints instead of simply two endpoints, we retain the ability to model 1:1, 1:\* and \*:\* links. Each endpoint is a uuid reference to an endpoint that is logically owned by a node.

### Endpoint

The endpoint object encapsulates a set of properties. It is the junction between nodes and links.

## Constraints

The purpose of XIR is to model networked systems as a set of constraints. These constraints are represented as inline JSON objects as defined below.

### =: Equality

The equality operator constrains the matching value space to elements that match the constraint value exactly. The following example constrains the matching value space to elements that have a key named "proc" and a value that is an object that contains a key "cores" that is exactly 4.

```JSON
{ "cores": { "constraint__": "=", "value__": 4 } }

```

### >: Greater
The greater operator constrains the matching value space to elements that are greater than the constraint value. The following example constrains the matching value space to elements that have a key named "proc" and a value that is an object that contains a key "cores" that is greater than 4.

```JSON
{ "cores": { "constraint__": ">", "value__": 4 } }

```

### <: Lesser
The lesser operator constrains the matching value space to elements that are less than the constraint value. The following example constrains the matching value space to elements that have a key named "proc" and a value that is an object that contains a key "cores" that is less than 4.

```JSON
{ "cores": { "constraint__": "<", "value_": 4 } }

```

### ?: Ordered Choice
The ordered choice operator constrains the matching value space to elements that are equal to at least one of the constraint values with a decreasing order of precedence. The following example constrains the matching value space to elements that have a key named "proc" and a value that is an object that contains a key "cores" that is greater than 4 or greater than 2 with a preference for greater than 4.

```JSON
{ "cores": { "constraint__": "?", "value__": [4, 2] } }

```

## Development

This repository comes with a [Dockerfile](xir.dock), a [build script](build_container.sh). The container is built with installed versions of all the language runtimes, plus the examples. See the dockerfile for mor details.
