package hw

// instruction set architecture

// ISA enum indicates instruction set achitecture.
type ISA uint

const (
	// X86_64 indicates Intel x86 ISA with 64 bit addresses
	X86_64 ISA = iota
)

// Proc represents a processor
type Proc struct {
	Base
	ISA           ISA    `json:"isa"`
	Family        string `json:"family"`
	BaseFrequency uint64 `json:"basefrequency"`
	L2            uint64 `json:"l2"`
	Cores         uint64 `json:"cores"`
	Threads       uint   `json:"threads"`
	Tdp           uint   `json:"tdp"`
}
