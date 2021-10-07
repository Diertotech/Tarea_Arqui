//conectarte a la base de datos


package db

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB
var databaseURL string

func init() {
//obtiene los valores de las variables de ambiente
	host := os.Getenv("DATABASE_HOST")
	port := os.Getenv("DATABASE_PORT")
	name := os.Getenv("DATABASE_NAME")
	user := os.Getenv("DATABASE_USER")
	password := os.Getenv("DATABASE_PASSWORD")

	databaseURL = fmt.Sprintf("host=%s port=%s user=%s dbname=%s password='%s' sslmode=disable",
		host, port, user, name, password)

}
//conectar a la base de datos
func Connect() {
	fmt.Println("Conectandose a la base de datos...")
	fmt.Println(databaseURL)
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})
	if err != nil {
		log.Panicln(err)
	}
	DB = db
}

func Setup() {
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})

	if err != nil {
		panic(err)
	}
	// Migrate the schema
	db.AutoMigrate(&Resena{})

}
