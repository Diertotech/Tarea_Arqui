
package api

import (
	db "cars/db"

	"github.com/gin-gonic/gin"
)

func DeleteResena(c *gin.Context) {
	id := c.Param("id")
	db.DB.Delete(&db.Resena{}, id)
	c.JSON(200, gin.H{
		"message": "Reseña eliminada",
	})
}