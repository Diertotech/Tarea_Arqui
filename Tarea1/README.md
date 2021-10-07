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

(ADVERTENCIA: Si hay problemas con el directorio del docker lo ideal es detener el contenedor donde este ubicado el archivo (5432) en caso contrario 
debe eliminar el proceso que este ejecutando postgres previamente con el comando fuser -k 8080/tcp)

Inicializar las variables de ambiente:
source .env

Correr la ORM(creara las tablas de la base de datos por medio de go):
go run ./setup/main.go ( debes estar parado dentro de backend )

Correr la API:
go run ./cmd/main.go

-------------------------------------------------------------------
levantar el front

Instalar node:
npm install

Levantar el front:
npm start


