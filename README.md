# DEW-R (Doer!): Distributed Eperiment Workflows Representation

DEW-R unifies behavior and topology of an experiment, but captures only relevant topological details. 

DEW-R has several design goals:

##High-level representation.##

It was important to us that DEW-R contains a human-readable, short
description of what the experiment is supposed to do.  Such a
description facilitates reuse, because researchers could, at a glance,
understand the experiment's actions and judge if this experiment is useful
to them.  Moreover, expressing what an experiment will do in broad strokes
captures the process, which so far has existed only in the researcher's
mind, and eases experiment design.

##Generic language. ##

DEW-R should support many diverse experiments, and thus its language must be
expressive enough to be broadly applicable, regardless of the experiment's
goal or testbed infrastructure where it will be realized.

##Self-contained representation. ##

We wanted DEW-R to contain sufficient details to facilitate automated
generation of experimental topologies and scripts, which would run on these
topologies.  If we could achieve this, then researchers could work with
experiments at a high level, delegating tedious, detail-oriented and
error-prone tasks to machines.  This would further facilitate generation of
topologies and scripts in many different languages, and for many different
testbed infrastructures, enabling portability.

##Decouple behavior from topology.##

We wanted to decouple the intended behavior from the topology where it will
be realized, thus enabling the same experiment to be scaled up and down
easily, by changing a few lines of DEW-R.  Our goal was to capture only the
necessary topology details in the form of constraints the behavior must
place on resources.

##Structured representation.##
We wanted to impose some natural structure on DEW-R, enabling researchers to
easily locate and focus on the important pieces for their goal.  This
structure should facilitate experiment design and running, which are aligned
with human cognitive process.

# Installing

You'll need:
	- Python (either 2.x or 3.x)
	- pyparsing
	- networkx 2+
Optionally you'll also want:
	- spaCy (for Natural Language Processing)
	- spaCy english model (en)

For spaCY install and model install instructions see:
	https://spacy.io/usage/
	https://spacy.io/usage/models

# Organization

You can find the BNF notation of DEW in BNF folder.

Folder UI has our UI implementation

Folder translators will house translators from other representations into DEW


