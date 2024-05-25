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
from .routers.create_daily_log import router as create_daily_log
from .routers.get_dashboard import router as get_dashboard
from .routers.get_my_books_title import router as get_my_books_title
from .routers.get_library import router as get_library
from .routers.get_book_detail import router as get_book_detail
from .routers.graph import router as graph
from .routers.get_awards import router as get_awards
from fastapi.middleware.cors import CORSMiddleware
# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Reactアプリケーションのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello yomitai Application"}

# 各ルーターを適切なプレフィックスでインクルード
app.include_router(signup_router, prefix="/api/signup", tags=["signup"])
app.include_router(login_router, prefix="/api/login", tags=["login"])
app.include_router(logout_router, prefix="/api/logout", tags=["logout"])
app.include_router(create_book_router, prefix="/api/books", tags=["create_book"])
app.include_router(create_daily_log, prefix="/api/logs", tags=["create_daily_log"])
app.include_router(get_dashboard, prefix="/api/dashboard", tags=["get_dashboard"])
app.include_router(get_my_books_title, prefix="/api/books", tags=["get_my_books_title"])
app.include_router(get_library, prefix="/api/library", tags=["get_library"])
app.include_router(graph, prefix="/api/graph", tags=["graph"])
app.include_router(get_awards, prefix="/api/awards", tags=["awards"])
app.include_router(get_book_detail, prefix="/api/books", tags=["book_details"])
