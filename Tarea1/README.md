Creando una pagina web con docker

Instalando docker-compose:
sudo apt install docker-compose

ejecutar el docker-compise: 
docker-compose up -d

acceder a una imagen:
docker exec -t "nombre contenedor" bash

-------------------------------------------------------------------
levantar el backend

Instalar go ubuntu:
sudo apt  install golang-go 

Iniciar la imagen de postgres con variables de ambientes definidas:
docker run -e POSTGRES_PASSWORD=123456 -p 5432:5432 postgres

Inicializar las variables de ambiente:
source ./backend/.env

Correr la ORM(creara las tablas de la base de datos por medio de go):
go run ./setup/main.go ( debes estar parado dentro de backend )

Correr la API:
go run backend/cmd/main.go




