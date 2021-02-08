package tb

type MzLinkInfo struct {
	LinkId int
}

type InterfaceIPConfig struct {
	Addrs []string
	Mtu   int
}

type BasicInterfaceConfig struct {
	Ip InterfaceIPConfig
}
