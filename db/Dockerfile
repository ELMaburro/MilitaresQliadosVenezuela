# Usa una imagen base oficial de MySQL
FROM mysql:8.0

# Copia el archivo de inicialización SQL al directorio de inicialización
COPY init.sql /docker-entrypoint-initdb.d/

# Exponer el puerto MySQL
EXPOSE 3306
