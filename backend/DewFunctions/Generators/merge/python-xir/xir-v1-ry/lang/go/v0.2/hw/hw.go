package hw

import (
	"encoding/json"

	"gitlab.com/mergetb/xir/lang/go/v0.2"
)

type Base struct {
	Manufacturer string   `json:"manufacturer,omitempty"`
	Model        string   `json:"model_name,omitempty"`
	SKU          string   `json:"model_name,omitempty"`
	Tags         []string `json:"tags,omitempty"`
	Integrated   bool     `json:"integrated,omitempty"`
	Cost         float64  `json:"cost,omitempty"`
}

type Element interface {
	BaseInfo() Base
	Show() string
}

func (b *Base) Tag(tags ...string) {
	b.Tags = append(b.Tags, tags...)
}

func toProps(thing interface{}) xir.Props {

	var result xir.Props
	buf, _ := json.Marshal(thing)
	json.Unmarshal(buf, &result)
	return result

}
