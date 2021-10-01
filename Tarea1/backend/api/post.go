package api

import (
	db "cars/db"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Message string `json:"message"`
}

func NewResena(ctx *gin.Context) {

	resena := db.Resena{}
	ctx.ShouldBindJSON(&resena)
	db.DB.Create(&resena)
	ctx.JSON(200, "Reseña agregada")
}