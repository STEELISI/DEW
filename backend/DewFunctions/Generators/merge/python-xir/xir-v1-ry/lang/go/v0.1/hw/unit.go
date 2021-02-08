package hw

import (
	"math"
)

func Mhz(value uint64) uint64 {
	return value * uint64(math.Pow10(6))
}

func Mb(value uint64) uint64 {
	return value * uint64(math.Pow10(6))
}

func Gb(value uint64) uint64 {
	return value * uint64(math.Pow10(9))
}

func Tb(value uint64) uint64 {
	return value * uint64(math.Pow10(12))
}

func Kb(value uint64) uint64 {
	return value * uint64(math.Pow10(3))
}

func Mbps(value uint64) uint64 {
	return value * uint64(math.Pow10(6))
}

func Gbps(value uint64) uint64 {
	return value * uint64(math.Pow10(9))
}
