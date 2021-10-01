Creando una pagina web con docker

Iniciar la imagen de postgres con variables de ambientes definidas:
docker run -e POSTGRES_PASSWORD=123456 -p 5432:5432 postgres

Iniicializar las variables de ambiente:
source ./backend/.env

Instalando docker-compose:
sudo apt install docker-compose

ejecutar el docker-compise: 
docker-compose up -d

acceder a una imagen:
docker exec -t "nombre contenedor" bash

