from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import auth
import products
import sales
from config import FRONTEND_URL
from database import Base, engine

Base.metadata.create_all(engine)

app = FastAPI(title="TindaMate API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(sales.router)


@app.get("/")
def health():
    return {"status": "ok"}
