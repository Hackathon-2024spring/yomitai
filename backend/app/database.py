from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# yomitaiディレクトリでdocker compose upする場合に使用
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://mysql:mysql@localhost:3306/yomitai?charset=utf8mb4"
# backendディレクトリでdevcontainerを使う場合に使用
# SQLALCHEMY_DATABASE_URL = "mysql+pymysql://mysql:mysql@db:3306/yomitai?charset=utf8mb4"


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
