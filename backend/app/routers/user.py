from typing import Any
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import SessionLocal, engine
from app.models import User
from app.schemas import User
from app import crud, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# 動作確認用
@router.get ("/hello")
def hello():
    return {"hello world"}

@router.post ("/create")
def create(user: User, db: Session = Depends(get_db)):
    new_user =models.User(user_name=user.user_name, email=user.email, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# パスワード認証
security = HTTPBasic()
def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.username != "admin" or credentials.password != "secret":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@router.get("/users/me")
def read_current_user(username: str = Depends(get_current_username)):
    return {"username": username}

# サインアップ
@router.post("/signup", response_model=schemas.User)
def create_user_endpoint(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # ユーザー名が既に登録されているかチェック
    db_user = crud.get_user_by_name(db, name=user.user_name)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)


# ログイン
@router.post("/login")
def login():
    pass
