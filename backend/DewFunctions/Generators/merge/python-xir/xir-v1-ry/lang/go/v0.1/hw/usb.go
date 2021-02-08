package hw

type UsbVersion float32

const (
	USB1  UsbVersion = 1.0
	USB11 UsbVersion = 1.1
	USB20 UsbVersion = 2.0
	USB21 UsbVersion = 2.1
	USB30 UsbVersion = 3.0
	USB31 UsbVersion = 3.1
)

type Usb struct {
	Version UsbVersion `json:"version"`
}
