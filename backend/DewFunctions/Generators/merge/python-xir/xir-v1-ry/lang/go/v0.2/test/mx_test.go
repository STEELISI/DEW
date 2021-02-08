package main

import (
	"fmt"
	"os/exec"
	"testing"

	"gitlab.com/mergetb/xir/lang/go"
)

func TestHelloWorld(t *testing.T) {

	src, err := exec.Command("python3", "two.py").CombinedOutput()
	if err != nil {
		t.Fatal(err)
	}

	x, err := xir.FromString(string(src))
	if err != nil {
		t.Fatal(err)
	}

	fmt.Println(x.String())

}
