
package main
//importar la api 
import (
	"cars/api"
	"cars/db"
	"time"

	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
)

//endpoints que seran las funcionalidades que se podran hacer en la pagina
func main() {

	db.Connect()
	server := gin.Default()
	server.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "",
		MaxAge:          50 * time.Second,
		Credentials:     true,
		ValidateHeaders: false,
	}))
//endpoints
	server.GET("/resenasbyname", api.GetAllResenasByName)
	server.GET("/resena", api.GetAllResena)
	server.POST("/resena", api.NewResena)
	server.DELETE("/resena/:id", api.DeleteResena)
	server.PUT("/resenaput1/:id/:calificacion", api.UpdateResenaCalificacion)
	server.PUT("/resenaput2/:id/:comentario",api.UpdateResenaComentario)
	server.Run()
}