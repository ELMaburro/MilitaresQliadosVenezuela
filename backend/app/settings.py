from dotenv import load_dotenv
from pydantic import Field
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    MYSQL_ROOT_PASSWORD: str = "password"
    MYSQL_DATABASE: str = "plantilla"
    DB_HOST: str = "db"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = "password"
    BACKEND_URL: str = "http://localhost:8000"
    FRONTEND_URL: str = "http://frontend:3000"
    FRONTEND_LOCAL: str = "http://localhost:3000"


settings = Settings()
