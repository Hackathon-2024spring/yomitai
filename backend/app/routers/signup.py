from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from .. import crud, models, schemas, database

router = APIRouter()

@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # 既存のユーザーがいるか確認
    db_user = crud.get_user_by_username(db, username=user.user_name)
    if db_user:
        raise HTTPException(status_code=400, detail="UserName already registered")

    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # パスワードが一致しているか確認
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match.")

    # 新しいユーザーを作成
    new_user = crud.create_user(db=db, user=user)
    return new_user
