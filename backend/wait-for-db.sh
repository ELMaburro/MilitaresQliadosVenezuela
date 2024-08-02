#!/bin/sh

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."

while ! nc -z $DB_HOST $DB_PORT; do
    sleep 1
done

echo "MySQL is ready"
exec "$@"

