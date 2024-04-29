from sqlalchemy.orm import Session

from . import models, schemas
from passlib.context import CryptContext
from .auth import hash_password  # auth.pyからハッシュ化関数をインポート


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.user_name == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


# パスワードのハッシュ化設定
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def hash_password(password: str) -> str:
#     return pwd_context.hash(password)

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data.pop("password")  # 元のパスワードを削除
    new_user = models.User(**user_data, password=hashed_password)
    db.add(new_user)
    try:
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    # new_user = models.User(**user.dict(),password=hashed_password)
    # db.add(new_user)
    # db.commit()
    # db.refresh(new_user)
    # return new_user


# def get_tasks(db: Session, user_id: int, skip: int = 0, limit: int = 100):
#     return db.query(models.Task).filter(models.Task.user_id == user_id).offset(skip).limit(limit).all()


# def create_user_task(db: Session, task: schemas.TaskCreate, user_id: int):
#     new_task = models.Task(**task.dict(), user_id=user_id)
#     db.add(new_task)
#     db.commit()
#     db.refresh(new_task)
#     return new_task
