#!/bin/bash

set -e

mkdir -p .tools
GOBIN=`pwd`/.tools go install github.com/golang/protobuf/protoc-gen-go
PATH=./.tools:$PATH protoc -I.. ../core.proto --go_out=plugins=grpc:.
mv gitlab.com/mergetb/xir/v0.3/go/core.pb.go .
rm -rf gitlab.com
