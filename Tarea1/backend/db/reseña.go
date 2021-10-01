package db

import (
	"gorm.io/gorm"
)

type Resena struct {
	gorm.Model
	ID       int
	Nombre     string `json:"nombre"`
	Calificacion float32 `json:"calificacion"`
	Comentario  string `json:"comentario"`
	Caratula string `json:"caratula"`
	Genero string `json:"genero"`
}