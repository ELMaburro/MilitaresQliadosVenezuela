from typing import List, Optional, Dict

from fastapi import FastAPI, Depends, Query, Request
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

from app import models, schemas
from app.database import SessionLocal, engine
from app.schemas import DatosPersonales
from app.settings import settings

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_filters(request: Request) -> Dict[str, str]:
    return {key: value for key, value in request.query_params.items() if key not in {"skip", "limit"}}


@app.get("/datos_personales/", response_model=List[schemas.DatosPersonales])
async def read_data(
        skip: int = 0,
        limit: int = 100,
        filters: Dict[str, str] = Depends(get_filters),
        db: Session = Depends(get_db)
):
    query = db.query(models.DatosPersonales)

    # Apply filters if provided
    for filter_field, filter_value in filters.items():
        query = query.filter(getattr(models.DatosPersonales, filter_field).ilike(f"%{filter_value}%"))

    items = query.offset(skip).limit(limit).all()
    return items


origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
