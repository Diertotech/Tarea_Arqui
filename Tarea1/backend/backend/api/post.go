package api

import (
	db "cars/db"

	"github.com/gin-gonic/gin"
)



func NewResena(ctx *gin.Context) {

	resena := db.Resena{}
	ctx.ShouldBindJSON(&resena)
	db.DB.Create(&resena)
	ctx.JSON(200, "Reseña agregada")
}