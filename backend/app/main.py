from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get ("/hello")
def hello():
    return {"hello world"}


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# @app.post("/users/", response_model=schemas.User)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = crud.get_user_by_name(db, name=user.name)
#     if db_user:
#         raise HTTPException(status_code=400, detail=f"User name: {user.name} already exists.")
#     return crud.create_user(db=db, user=user)


# @app.get("/users/", response_model=list[schemas.User])
# def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     users = crud.get_users(db, skip=skip, limit=limit)
#     return users


# @app.get("/users/{user_id}", response_model=schemas.User)
# def get_user(user_id: int, db: Session = Depends(get_db)):
#     user = crud.get_user(db, user_id=user_id)
#     if user:
#         raise HTTPException(status_code=404, detail=f"User ID: {user_id} not found")
#     return user

# @app.post("/users/{user_id}/tasks/", response_model=schemas.Task)
# def create_task_for_user(user_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
#     task = crud.create_user_task(db=db, task=task, user_id=user_id)
#     return task


# @app.get("/users/{user_id}/tasks/", response_model=list[schemas.Task])
# def get_tasks_for_user(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     tasks = crud.get_tasks(db=db, user_id=user_id, skip=skip, limit=limit)
#     return tasks