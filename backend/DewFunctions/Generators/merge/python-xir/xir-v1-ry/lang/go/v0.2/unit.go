package xir

import (
	"math"
)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Bandwidth
// Measured in Gigabytes per seconds (10**X)
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Bps scales the given value in bits to bits per second
func Bps(value uint64) uint64 { return value }

// Kbps scales the given value in bits to kilobits per second
func Kbps(value uint64) uint64 { return value * uint64(math.Pow(10.0, 3.0)) }

// Mbps scales the given value in bits to megabits per second
func Mbps(value uint64) uint64 { return value * uint64(math.Pow(10.0, 6.0)) }

// Gbps scales the given value in bits to gigabits per second
func Gbps(value uint64) uint64 { return value * uint64(math.Pow(10.0, 9.0)) }

// Tbps scales the given value in bits to terabits per second
func Tbps(value uint64) uint64 { return value * uint64(math.Pow(10.0, 12.0)) }

// Pbps scales the given value in bits to petabits per second
func Pbps(value uint64) uint64 { return value * uint64(math.Pow(10.0, 15.0)) }

// Ebps scales the given value in bits to exabits per second
func Ebps(value uint64) uint64 { return value * uint64(math.Pow(10.0, 18.0)) }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Memory/Storage
// Measured in Gigibytes (math.Pow(2.0,)X)
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// B scales the given value to bytes
func B(value uint64) uint64 { return value }

// KB scales the given value in bytes to kilobytes
func KB(value uint64) uint64 { return value << 10 }

// MB scales the given value in bytes to megabytes
func MB(value uint64) uint64 { return value << 20 }

// GB scales the given value in bytes to gigabytes
func GB(value uint64) uint64 { return value << 30 }

// TB scales the given value in bytes to terabytes
func TB(value uint64) uint64 { return value << 40 }

// PB scales the given value in bytes to petabytes
func PB(value uint64) uint64 { return value << 50 }

// EB scales the given value in bytes to exabytes
func EB(value uint64) uint64 { return value << 60 }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Clock Speed
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Hz scales the given Hz value to Hz
func Hz(value float64) float64 { return value }

// KHz scales the given Hz value to KHz
func KHz(value float64) float64 { return value * math.Pow(10.0, 3.0) }

// MHz scales the given Hz value to MHz
func MHz(value float64) float64 { return value * math.Pow(10.0, 6.0) }

// GHz scales the given Hz value to GHz
func GHz(value float64) float64 { return value * math.Pow(10.0, 9.0) }

// THz scales the given Hz value to THz
func THz(value float64) float64 { return value * math.Pow(10.0, 12.0) }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Latency
// The base unit is nanoseconds
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Ns scales the given value in seconds to nanoseconds
func Ns(value float64) float64 { return value }

// Us scales the given value in seconds to microseconds
func Us(value float64) float64 { return value / math.Pow(10.0, 3.0) }

// Ms scales the given value in seconds to milliseconds
func Ms(value float64) float64 { return value / math.Pow(10.0, 6.0) }

// S scales the given value in seconds to seconds
func S(value float64) float64 { return value / math.Pow(10.0, 9.0) }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// Loss
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Percent scales the given integer value to a percent of 100
func Percent(value float64) float64 { return value / 100.0 }
