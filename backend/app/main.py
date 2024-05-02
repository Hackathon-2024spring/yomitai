from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from . import crud, models, schemas
from .database import SessionLocal, engine
from .models import User
from .schemas import User
from .routers.user import router as user_router
from .routers.signup import router as signup_router
from .routers.login import router as login_router
from .routers.create_book import router as create_book_router

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 各ルーターを適切なプレフィックスでインクルード
app.include_router(user_router, prefix="/user", tags=["user"])
app.include_router(signup_router, prefix="/api/signup", tags=["signup"])
app.include_router(login_router, prefix="/api/login", tags=["login"])
app.include_router(create_book_router, prefix="/api/books", tags=["create_book"])


# routerディレクトリをインクルード
# app.include_router(router)


# 当初各機能をmain.pyに記述していたが、チーム開発のしやすさを考慮し、routerディレクトリに記述する。
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# # 動作確認用
# @app.get ("/hello")
# def hello():
#     return {"hello world"}

# @app.post ("/create")
# def create(user: User, db: Session = Depends(get_db)):
#     new_user =models.User(user_name=user.user_name, email=user.email, password=user.password)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return new_user

# # パスワード認証
# security = HTTPBasic()
# def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
#     if credentials.username != "admin" or credentials.password != "secret":
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Basic"},
#         )
#     return credentials.username

# @app.get("/users/me")
# def read_current_user(username: str = Depends(get_current_username)):
#     return {"username": username}

# # サインアップ
# @app.post("/signup", response_model=schemas.User)
# def create_user_endpoint(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     # ユーザー名が既に登録されているかチェック
#     db_user = crud.get_user_by_name(db, name=user.user_name)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Username already registered")
#     return crud.create_user(db=db, user=user)


# # ログイン
# @app.post("/login")
# def login():
#     pass


# # ダッシュボード表示
# @app.get ("/dashbord")
# async def summary_information():
#     pass

# # グラフ表示
# @app.get ("/dashbord/graph")
# async def switch_graph():
#     pass

# # ライブラリ表示
# @app.get ("/dashbord/library")
# async def list_books():
#     pass

# # ミッション表示
# @app.get ("/dashbord/missions")
# async def list_awards():
#     pass


# # 書籍登録
# @app.post ("/dashbord/books")
# async def create_book():
#     pass

# # 書籍詳細表示
# @app.get ("/dashbord/{book_id}")
# async def book_detail():
#     pass

# # 書籍詳細編集
# @app.patch ("/dashbord/{bool_id}")
# async def update_book():
#     pass

# # 読書記録登録
# @app.post ("/dashbord/logs")
# async def create_log():
#     pass

# # タグ作成？
# @app.post ("/dashbord/tag")
# async def create_tag():
#     pass



# 以下ネットのサンプルコード
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
