package hw

import (
	"encoding/json"

	"gitlab.com/mergetb/xir/lang/go"
)

type Base struct {
	Manufacturer string   `json:"manufacturer"`
	Model        string   `json:"model"`
	Tags         []string `json:"tags"`
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
