from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from . import crud, models, schemas
from .database import SessionLocal, engine
from .models import User
from .schemas import User
from .routers.signup import router as signup_router
from .routers.login import router as login_router
from .routers.logout import router as logout_router
from .routers.create_book import router as create_book_router

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 各ルーターを適切なプレフィックスでインクルード
app.include_router(signup_router, prefix="/api/signup", tags=["signup"])
app.include_router(login_router, prefix="/api/login", tags=["login"])
app.include_router(logout_router, prefix="/api/logout", tags=["logout"])
app.include_router(create_book_router, prefix="/api/books", tags=["create_book"])

