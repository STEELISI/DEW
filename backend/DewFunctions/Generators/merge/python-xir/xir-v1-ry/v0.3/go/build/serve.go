package build

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gitlab.com/mergetb/xir/v0.3/go"
)

func modelServer(fa *xir.Facility) {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	e.GET("/graphology", func(c echo.Context) error {
		gs := graphologySpec(fa)
		return c.JSON(http.StatusOK, gs)
	})
	e.Logger.Fatal(e.Start(":8086"))
}
