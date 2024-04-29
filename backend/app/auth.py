from passlib.context import CryptContext
from sqlalchemy.orm import Session
from . import crud, models
from datetime import datetime, timedelta

# passlibの設定: ここではbcryptアルゴリズムを使用
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    # プレーンテキストのパスワードとハッシュ化されたパスワードを比較
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password):
    # パスワードをハッシュ化
    return pwd_context.hash(password)

def get_user_hashed_password(db: Session, user_name: str):
    # データベースからユーザーを取得し、ハッシュ化されたパスワードを返す
    user = crud.get_user_by_username(db, user_name)
    if user:
        return user.password
    return None

def authenticate_user(db: Session, user_name: str, password: str):
    # ユーザーのハッシュ化されたパスワードを取得
    stored_password = get_user_hashed_password(db, user_name)
    if not stored_password:
        # ハッシュ化されたパスワードが見つからなければ、認証失敗
        return False
    if verify_password(password, stored_password):
        # パスワードが一致すれば、ユーザーオブジェクトを返す
        return crud.get_user_by_username(db, user_name)
    # パスワードが一致しなければ、認証失敗
    return False
