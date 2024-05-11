from sqlalchemy.orm import Session
from datetime import date, datetime
from sqlalchemy import func
from . import models, schemas
from .schemas import Book, MyBook
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


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data.pop("password")  # 元のパスワードを削除
    user_data.pop("confirm_password", None)  # 確認用パスワードも削除
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


# ISBNコードをDBから検索し取得
def get_book_by_isbn(db: Session, isbn: int):
    return db.query(models.Book).filter(models.Book.isbn_code == isbn).first()


# my_booksテーブルにレコードを追加（自動登録）
def create_my_book(db: Session, book: MyBook, user_id: int,genre_id: int, book_id: int):
    # 新しいMy_bookオブジェクトの作成
    db_my_book = models.My_book(
        user_id=user_id,
        book_id=book_id,
        genre_id=genre_id,
        title=book.title,
        author=book.author,
        publisher=book.publisher,
        total_page=book.total_page,
        image=book.image,
        start_date=book.start_date,
        planned_end_date=book.planned_end_date,
        end_date=None
     )
    # 新しい書籍をデータベースセッションに追加
    db.add(db_my_book)
    # 変更をコミットしてデータベースに保存
    db.commit()
    # 新しい書籍情報をリフレッシュして、IDなどの自動生成フィールドを含める
    db.refresh(db_my_book)
    # 新しい書籍オブジェクトを返す
    return db_my_book


# booksテーブルとmy_booksテーブルにレコードを追加（自動登録）
def create_book_and_my_book(db: Session, book: Book,user_id: int,genre_id: int):
    # 新しいBookオブジェクトの作成
    db_book = models.Book(
        title=book.title,
        author=book.author,
        publisher=book.publisher,
        total_page=book.total_page,
        isbn_code=book.isbn_code,
        image=book.image,
        genre_id=genre_id
     )
    # 新しい書籍をデータベースセッションに追加
    db.add(db_book)
    # 変更をコミットしてデータベースに保存
    db.commit()
    # 新しい書籍情報をリフレッシュして、IDなどの自動生成フィールドを含める
    db.refresh(db_book)
    # 登録したbook_idを取得する
    book_id=db_book.id

    # 新しいMy_bookオブジェクトの作成
    db_my_book = models.My_book(
        user_id=user_id,
        book_id=db_book.id,
        genre_id=genre_id,
        title=book.title,
        author=book.author,
        publisher=book.publisher,
        total_page=book.total_page,
        image=book.image,
        start_date=book.start_date,
        planned_end_date=book.planned_end_date,
        end_date=None
     )
    # 新しい書籍をデータベースセッションに追加
    db.add(db_my_book)
    # 変更をコミットしてデータベースに保存
    db.commit()
    # 新しい書籍情報をリフレッシュして、IDなどの自動生成フィールドを含める
    db.refresh(db_my_book)
    # 新しい書籍オブジェクトを返す
    return db_my_book


# my_booksテーブルにレコードを追加(手動登録)
def munual_create_my_book(db: Session, book: MyBook, user_id: int,genre_id: int):
    # 新しいMy_bookオブジェクトの作成
    db_my_book = models.My_book(
        user_id=user_id,
        book_id=None,
        genre_id=genre_id,
        title=book.title,
        author=book.author,
        publisher=book.publisher,
        total_page=book.total_page,
        image=book.image,
        start_date=book.start_date,
        planned_end_date=book.planned_end_date,
        end_date=None
     )
    # 新しい書籍をデータベースセッションに追加
    db.add(db_my_book)
    # 変更をコミットしてデータベースに保存
    db.commit()
    # 新しい書籍情報をリフレッシュして、IDなどの自動生成フィールドを含める
    db.refresh(db_my_book)
    # 新しい書籍オブジェクトを返す
    return db_my_book
# reading_sessionsテーブルにレコードを追加
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

# 引数に一致するジャンル名をDBから取得
def get_genre_by_name(db: Session, name: str):
    return db.query(models.Genre).filter(models.Genre.name == name).first()


# tagsテーブルから引数に一致するタグを取得
def get_tag_by_name(db: Session, tag_name: str):
    # タグを取得するcrud処理
    return db.query(models.Tag).filter(models.Tag.tag_name == tag_name).first()

# tagsテーブルにレコードを追加
def create_tag(db: Session, tag_name: str):
    # タグを登録するcrud処理
    new_tag = models.Tag(tag_name=tag_name)
    # 新しいタグをデータベースセッションに追加
    db.add(new_tag)
    # 変更をコミットしてデータベースに保存
    db.commit()
    # 新しいタグ情報をリフレッシュして、IDなどの自動生成フィールドを含める
    db.refresh(new_tag)
    # 新しいタグオブジェクトを返す
    return new_tag

# book_tagsにレコードを追加
def create_book_tag(db: Session, my_book_id: int, tag_id: int):
    new_book_tag = models.Book_tag(
        my_book_id=my_book_id,
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

# reading_sessionsからuser.idとbook.idを使用して書籍タイトルを取得
def get_my_book_by_user_and_title(db: Session, user_id: int, title: str):
    # ` `books` を `user_id` と `books.title` でフィルタリング
    result = db.query(models.My_book).\
        filter(models.My_book.user_id == user_id, models.My_book.title == title).\
        first()

    if result is None:
        return None

    return result

# daily_logsテーブルとbook_memoテーブルにレコードを追加
def create_log(db: Session, my_book_id: int, page_read: int, reading_date: datetime, memo_text: str):
    # daily_logsをuser_idとbook_idでフィルタし、総ページ数を計算
    total_read_pages = db.query(func.sum(models.Daily_log.page_read)).filter(
        models.Daily_log.my_book_id == my_book_id
    ).scalar() or 0
    
    page_read_today = page_read - total_read_pages

    book = db.query(models.My_book).filter(models.My_book.id == my_book_id).first()
    if book and page_read >= book.total_page:
        book.end_date = datetime.today()
    
    new_log = models.Daily_log(
        my_book_id=my_book_id,
        page_read=page_read_today,
        date=reading_date,
        memo=memo_text
    )
    db.add(new_log)    
    db.commit()