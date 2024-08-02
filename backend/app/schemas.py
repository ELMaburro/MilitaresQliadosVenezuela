from typing import Optional
from pydantic import BaseModel
from datetime import date


class DatosPersonales(BaseModel):
    cod_emp: str
    cedula: str
    grado_militar: str
    apellido1: str
    apellido2: Optional[str]
    nombre1: str
    nombre2: Optional[str]
    ubicacion: str
    ubicacion_detallada: str
    cargo: str
    tipo_emp: str
    categoria: str
    sueldo: str
    fecha_nacim: Optional[date] = None
    sexo: str
    estado_civil: str
    nivel_instruccion: str
    direccion: str
    ciudad: str
    estado: str
    telefono_cel: str
    telefono_ofi: str
    correo: str
    ciudad_origen: str
    estados_origen: str
    vivienda: str
    discapacidad: str
    riesgo: str

    class Config:
        orm_mode = True
