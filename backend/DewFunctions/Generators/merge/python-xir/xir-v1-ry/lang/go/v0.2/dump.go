package xir

import (
	"fmt"

	"github.com/mergetb/yaml/v3"
)

func (n *Net) Dump() {

	buf, _ := yaml.Marshal(*n)
	fmt.Println(string(buf))

}
