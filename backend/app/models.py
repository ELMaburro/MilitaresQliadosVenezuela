from sqlalchemy import Column, String, Date
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class DatosPersonales(Base):
    __tablename__ = 'datos_personales'
    cod_emp = Column(String(7), primary_key=True)
    cedula = Column(String(8), nullable=False)
    grado_militar = Column(String(40), nullable=False)
    apellido1 = Column(String(80), nullable=False)
    apellido2 = Column(String(50))
    nombre1 = Column(String(50), nullable=False)
    nombre2 = Column(String(50))
    ubicacion = Column(String(100), nullable=False)
    ubicacion_detallada = Column(String(200), nullable=False)
    cargo = Column(String(100), nullable=False)
    tipo_emp = Column(String(20), nullable=False)
    categoria = Column(String(255), nullable=False)
    sueldo = Column(String(11), nullable=False)
    fecha_nacim = Column(Date, nullable=True)  # Cambiado a nullable=True
    sexo = Column(String(10), nullable=False)
    estado_civil = Column(String(17), nullable=False)
    nivel_instruccion = Column(String(15), nullable=False)
    direccion = Column(String(200), nullable=False)
    ciudad = Column(String(20), nullable=False)
    estado = Column(String(20), nullable=False)
    telefono_cel = Column(String(15), nullable=False)
    telefono_ofi = Column(String(15), nullable=False)
    correo = Column(String(30), nullable=False)
    ciudad_origen = Column(String(80), nullable=False)
    estados_origen = Column(String(80), nullable=False)
    vivienda = Column(String(255), nullable=False)
    discapacidad = Column(String(255), nullable=False)
    riesgo = Column(String(255), nullable=False)
