package hw

type Disk struct {
	Base
	Capacity   uint64 `json:"capacity"`
	FormFactor string `json:"formfactor"`
	Interface  string `json:"interface"`
}
