
package api

import (
	db "cars/db"

	"github.com/gin-gonic/gin"
)

func GetAllResena(ctx *gin.Context) {

	reseñas := []db.Resena{}
	db.DB.Find(&reseñas)
	ctx.JSON(200, reseñas)
}
func GetResenaByName(ctx *gin.Context) {
	nombre := ctx.Request.URL.Query().Get("nombre")
	reseña := db.Resena{}
	db.DB.Where("nombre = ?", nombre).Find(&reseña)
	ctx.JSON(200, reseña)
}

func GetAllResenasByName(ctx *gin.Context) {
	nombre := ctx.Request.URL.Query().Get("nombre")
	reseñas := []db.Resena{}
	db.DB.Where("name like ?", "%"+nombre+"%").Find(&reseñas)
	ctx.JSON(200, reseñas)
}