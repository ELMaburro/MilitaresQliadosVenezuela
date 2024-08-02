FROM python:3.12-alpine

WORKDIR /app

# Instalar dependencias necesarias
RUN apk update && apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    openssl-dev \
    cargo \
    netcat-openbsd

# Copiar y instalar dependencias de Python
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Añadir el script de espera
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh

CMD ["/wait-for-db.sh", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
