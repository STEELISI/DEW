package xrvn

type Topo struct {
	Name     string `json:"name"`
	Nodes    []Node `json:"nodes"`
	Switches []Node `json:"switches"`
	Links    []Link `json:"links"`

	ports map[string]int
}

func NewTopo() *Topo {

	topo := &Topo{
		Name:     "",
		Nodes:    make([]Node, 0),
		Switches: make([]Node, 0),
		Links:    make([]Link, 0),
		ports:    make(map[string]int),
	}

	return topo
}

func (t *Topo) NextPort(node string) int {
	p, ok := t.ports[node]
	if !ok {
		t.ports[node] = 0
		return 0
	} else {
		t.ports[node] = p + 1
		return p + 1
	}
}

type Node struct {
	Name     string  `json:"name"`
	OS       string  `json:"os"`
	Image    string  `json:"image,omitempty"`
	CPU      *CPU    `json:"cpu,omitempty"`
	Memory   *Memory `json:"memory,omitempty"`
	Mounts   []Mount `json:"mounts,omitempty"`
	Ebpf     bool    `json:"ebpf"`
	Emulator string  `json:"emulator"`
}

type CPU struct {
	Cores int `json:"cores"`
}

type Memory struct {
	Capacity Unit `json:"capacity"`
}

type Unit struct {
	Value int    `json:"value"`
	Unit  string `json:"unit"`
}

type Mount struct {
	Source string `json:"source"`
	Point  string `json:"point"`
}

type Link struct {
	Name      string      `json:"name"`
	Endpoints [2]Endpoint `json:"endpoints"`
}

type Endpoint struct {
	Name string `json:"name"`
	Port int    `json:"port"`
}

type Config struct {
	MaxMemory int `yaml:"MaxMemory"`
	MaxCore   int `yaml:"MaxCore"`
}
