package db

import (
	"gorm.io/gorm"
)

type Resena struct {
	gorm.Model
	ID       int
	Nombre     string `json:"nombre"`
	Calificacion int `json:"calificacion"`
	Comentario  string `json:"comentario"`
	Caratula string `json:"caratula"`
	Genero string `json:"genero"`
}