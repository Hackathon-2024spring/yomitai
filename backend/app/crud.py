from sqlalchemy.orm import Session
from datetime import date, datetime

from . import models, schemas
from .schemas import Book
from passlib.context import CryptContext
from .auth import hash_password  # auth.pyからハッシュ化関数をインポート
from fastapi import HTTPException

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

# ISBNコードをDBから検索し取得
def get_book_by_isbn(db: Session, isbn: str):
    return db.query(models.Book).filter(models.Book.isbn_code == isbn).first()

def create_book(db: Session, book: Book):
    # 新しいBookオブジェクトの作成
    db_book = models.Book(
        title=book.title,
        author=book.author,
        publisher=book.publisher,
        total_page=book.total_page,
        isbn_code=book.isbn,
        image=book.image,
     )
    # 新しい書籍をデータベースセッションに追加
    db.add(db_book)
    # 変更をコミットしてデータベースに保存
    db.commit()
    # 新しい書籍情報をリフレッシュして、IDなどの自動生成フィールドを含める
    db.refresh(db_book)
    # 新しい書籍オブジェクトを返す
    return db_book


def create_reading_session(db: Session, user_id: int, book_id: int, planned_end_date: date):
    # 新しいReadingSessionオブジェクトの作成
    db_reading_session = models.Reading_session(
        user_id=user_id,
        book_id=book_id,
        start_date=datetime.now(),  # 現在の日付・時刻をstart_dateとして使用
        planned_end_date=planned_end_date,
        # created_atは省略。モデルでデフォルト値が設定されているため
    )
    # 新しい読書セッションをデータベースセッションに追加
    db.add(db_reading_session)
    # 変更をコミットしてデータベースに保存
    db.commit()
    # 新しい読書セッション情報をリフレッシュ
    db.refresh(db_reading_session)
    # 新しい読書セッションオブジェクトを返す
    return db_reading_session

def get_genre_by_name(db: Session, name: str):
    return db.query(models.Genre).filter(models.Genre.name == name).first()

def create_book_genre(db: Session, user_id: int, book_id: int, genre_id: int):
    db_book_genre = models.Book_genre(
        user_id=user_id,
        book_id=book_id,
        genre_id=genre_id,
    )
    db.add(db_book_genre)
    db.commit()
    db.refresh(db_book_genre)
    return db_book_genre

def get_tag_by_name(db: Session, name: str):
    # タグを取得するcrud処理
    return db.query(models.Tag).filter(models.Tag.name == name).first()

def create_tag(db: Session, name: str):
    # タグを登録するcrud処理
    new_tag = models.Tag(name=name)
    # 新しいタグをデータベースセッションに追加
    db.add(new_tag)
    # 変更をコミットしてデータベースに保存
    db.commit()
    # 新しいタグ情報をリフレッシュして、IDなどの自動生成フィールドを含める
    db.refresh(new_tag)
    # 新しいタグオブジェクトを返す
    return new_tag

def create_book_tag(db: Session, user_id: int, book_id: int, tag_id: int):
    new_book_tag = models.Book_tag(
        user_id=user_id,
        book_id=book_id,
        tag_id=tag_id,
    )
    # 新しいbook_tagをデータベースセッションに追加
    db.add(new_book_tag)
    # 変更をコミットしてデータベースに保存
    db.commit()
    # 新しいbook_tag情報をリフレッシュして、IDなどの自動生成フィールドを含める
    db.refresh(new_book_tag)
    # 新しいbook_tagオブジェクトを返す
    return new_book_tag