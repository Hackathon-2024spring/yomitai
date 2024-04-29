from fastapi import APIRouter, HTTPException, Depends, Response, status
from sqlalchemy.orm import Session
from .. import crud, models, schemas, database
from ..auth import authenticate_user
import secrets

router = APIRouter()

@router.post("/")

def login(user_name: str, password: str, response: Response, db: Session = Depends(database.get_db)):
    # ユーザー認証
    user = authenticate_user(db, user_name, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    # セッションIDを生成してクッキーに保存
    session_id = secrets.token_urlsafe()
    response.set_cookie(key="session_id", value=session_id, httponly=True, secure=True, samesite='Lax')

    return {"message": "Login successful!"}

@router.post("/logout")
def logout(response: Response):
    # クッキーからセッションIDを削除
    response.delete_cookie("session_id")
    return {"message": "Logged out"}
