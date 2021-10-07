package api


import (
	db "cars/db"

	"github.com/gin-gonic/gin"
)



func UpdateResenaCalificacion(c  *gin.Context){

	id := c.Param("id")
	calificacion := c.Param("calificacion")
	resena := db.Resena{}

	db.DB.Model(&resena).Where("id = ?", id).Update("calificacion", calificacion)
}

func UpdateResenaComentario(c  *gin.Context){

	id := c.Param("id")
	comentario := c.Param("comentario")
	resena := db.Resena{}

	db.DB.Model(&resena).Where("id = ?", id).Update("comentario", comentario)
}