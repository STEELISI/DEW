package xp

import (
	"gitlab.com/mergetb/xir/lang/go/v0.2"
)

type Link struct {
	Devices  []Device
	Capacity xir.Constraint
	Latency  xir.Constraint
	Loss     xir.Constraint
}
