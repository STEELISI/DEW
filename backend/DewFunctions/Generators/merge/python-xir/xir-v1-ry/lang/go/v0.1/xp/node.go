package xp

import (
	"gitlab.com/mergetb/xir/lang/go"
)

type Device struct {
	Id       string
	Proc     Proc
	Memory   Memory
	Endpoint []Endpoint
}

type Proc struct {
	Isa           xir.Constraint
	Count         xir.Constraint
	Cores         xir.Constraint
	Family        xir.Constraint
	BaseFrequency xir.Constraint
	L2            xir.Constraint
	Threads       xir.Constraint
	TDP           xir.Constraint
}

type Memory struct {
	Capacity xir.Constraint
}

type IP struct {
	Addrs []string
	Mtu   int
}

type Endpoint struct {
	Ip IP
}
