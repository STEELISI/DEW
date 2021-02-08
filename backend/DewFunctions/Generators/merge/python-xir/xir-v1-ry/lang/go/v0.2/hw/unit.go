package hw

import (
	"math"
)

func MHz(value uint64) uint64 {
	return value * uint64(math.Pow10(6))
}

func Kb(value uint64) uint64 {
	return value << 10
}

func Mb(value uint64) uint64 {
	return value << 20
}

func Gb(value uint64) uint64 {
	return value << 30
}

func Tb(value uint64) uint64 {
	return value << 40
}

func Kbps(value uint64) uint64 {
	return value * uint64(math.Pow10(3))
}

func Mbps(value uint64) uint64 {
	return value * uint64(math.Pow10(6))
}

func Gbps(value uint64) uint64 {
	return value * uint64(math.Pow10(9))
}

func Tbps(value uint64) uint64 {
	return value * uint64(math.Pow10(12))
}
