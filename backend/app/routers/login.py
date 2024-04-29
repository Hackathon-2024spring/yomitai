from fastapi import APIRouter, HTTPException, Depends, Body
from sqlalchemy.orm import Session
from .. import crud, models, schemas, database
from ..auth import authenticate_user, create_access_token
import datetime

router = APIRouter()

@router.post("/", response_model=schemas.Token)

def login(username: str = Body(...), password: str = Body(...), db: Session = Depends(database.get_db)):
    # ユーザー認証
    user = authenticate_user(db, username, password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    # アクセストークンの作成
    access_token_expires = datetime.timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    # 生成したトークンを含むレスポンスを返す
    return {"access_token": access_token, "token_type": "bearer"}
