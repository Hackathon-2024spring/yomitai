from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_name(db: Session, name: str):
    return db.query(models.User).filter(models.User.name == name).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# def get_tasks(db: Session, user_id: int, skip: int = 0, limit: int = 100):
#     return db.query(models.Task).filter(models.Task.user_id == user_id).offset(skip).limit(limit).all()


# def create_user_task(db: Session, task: schemas.TaskCreate, user_id: int):
#     new_task = models.Task(**task.dict(), user_id=user_id)
#     db.add(new_task)
#     db.commit()
#     db.refresh(new_task)
#     return new_task