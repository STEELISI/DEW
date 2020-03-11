import enum
class AccessControl(enum.Enum):
	none = 1
	read = 2
	write = 3
	manage = 4