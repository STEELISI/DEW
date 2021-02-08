package hw

type PowerRating struct {
	VoltageMin float32 `json:"voltage_min,omitempty"`
	VoltageMax float32 `json:"voltage_min,omitempty"`
	CurrentMax float32 `json:"current_max,omitempty"`
}

type ACPowerRating struct {
	PowerRating
	FreqMin float32 `json:"freq_min,omitempty"`
	FreqMax float32 `json:"freq_max,omitempty"`
}

type PowerConversionRating struct {
	ACinput  ACPowerRating `json:"ac_input,omitempty"`
	DCoutput PowerRating   `json:"dc_output,omitempty"`
}

type PSU struct {
	Base
	PowerRatingWatts int                     `json:"power_rating_w,omitempty"`
	IO               []PowerConversionRating `json:"io,omitempty"`
	EfficiencyRating int                     `json:"efficiency,omitempty"`
}
