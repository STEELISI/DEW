prefix ?= /usr/local

ver = v0.1

xirsrc = lang/go/$(ver)/*.go lang/go/$(ver)/hw/*.go lang/go/$(ver)/sys/*.go lang/go/$(ver)/xp/*.go lang/go/$(ver)/tb/*.go
things = build/xir

.PHONY: all
all: $(things)

build/xrvn: tools/apps/xrvn.go tools/xrvn/rvn.go $(xirsrc) | build
	go build -o $@ $<

build/xir: tools/apps/xir.go $(xirsrc) | build
	go build -o $@ $<


build:
	mkdir -p build

.PHONY: install
install: $(things)
	cp build/* $(prefix)/bin/

clean:
	rm -rf build
