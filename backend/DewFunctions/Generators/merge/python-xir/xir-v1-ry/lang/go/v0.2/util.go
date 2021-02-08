package xir

import (
	"fmt"
	"reflect"
	"strings"
)

// ParsePath takes in a dot separated path and returns and ordered list of path
// components. For example node.memory.size* -> [node, memory, size*].
func ParsePath(path string) []string {
	return strings.Split(path, ".")
}

// GetProp takes a path and returns the value at that path within the Props
// object. If no value is present nil is returned.
func (p Props) GetProp(path string) (interface{}, error) {
	return getProp(map[string]interface{}(p), ParsePath(path))
}

func getProp(x interface{}, path []string) (interface{}, error) {

	if len(path) > 0 {

		// if there are elements remaining in the path we must have a map
		// otherwise the path is not found so return nil
		if !IsMap(x) {
			return nil, fmt.Errorf(
				"End of object reached before path beginning at '%s' was found",
				strings.Join(path, "."),
			)
		}
		x_ := x.(map[string]interface{})

		// extract the current path component, returning nil if it is not found
		v, ok := x_[path[0]]
		if !ok {
			return nil, fmt.Errorf(
				"Path component beginning at '%s' does not exist",
				strings.Join(path, "."),
			)
		}

		// if we are on the last path component, return the extracted value
		if len(path) == 1 {
			return v, nil
		}

		// recurse down
		return getProp(v, path[1:])

	}
	return nil, fmt.Errorf(
		"End of object reached before path beginning at '%s' was found",
		strings.Join(path, "."),
	)

}

func IsMap(unk interface{}) bool {
	v := reflect.ValueOf(unk)
	return v.Kind() == reflect.Map
}

func IsArray(unk interface{}) bool {
	v := reflect.ValueOf(unk)
	return v.Kind() == reflect.Slice
}
