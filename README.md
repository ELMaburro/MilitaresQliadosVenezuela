# MilitaresQliadosVenezuela


Hola paisanos venezolanos y amigos de toda latinoamerica y el mundo.

para tester en local ejecutar 

```bash
docker compose up --build
```


Environment variables

crear un archivo .env en la direccion root del proyecto, es decir en la donde esta el docker-compose.
Para producciíon recuerden poner un password más seguro.
```sh
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=plantilla
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
BACKEND_URL=http://localhost:8000
```
