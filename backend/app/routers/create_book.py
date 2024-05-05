from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import crud, models, schemas, database
from ..session_store import sessions
router = APIRouter()

# 新規書籍の登録と関連処理を実行するエンドポイント
@router.post("/", response_model=schemas.Book)
def process_book_registration(request: Request,book: schemas.BookCreate, db: Session = Depends(database.get_db)):
    db_book = None
    if book.isbn:
        # 書籍登録（バーコード登録）
        db_book = crud.get_book_by_isbn(db, isbn=book.isbn)
    
    if not db_book:
        # 書籍登録（手動登録または自動登録で見つからなかった場合）
        db_book = crud.create_book(db, book=book)

    # セッションIDの取得
    session_id = ""
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")
    
    # セッションIDに紐づくユーザーIDの取得
    user_id = sessions[session_id]

    # 読書セッションの登録
    crud.create_reading_session(db, book_id=db_book.id, user_id=user_id, planned_end_date=book.planned_end_date)
 
    
    # ジャンルの処理
    process_genre(request, db, book.genre, db_book.id)
    
    # タグの処理
    process_tags(request, db, book.tag, db_book.id)
    
    return db_book

# ジャンルの処理
def process_genre(request: Request, db: Session, genre: str, book_id: int):
    if genre:
        book_genre = crud.get_genre_by_name(db, name=genre)
        print(book_genre) # ！！デバック用コード。デプロイ前には削除すること！！
        if book_genre:
        # セッションIDの取得
            session_id = request.cookies.get("session_id")
            if session_id not in sessions:
                raise HTTPException(status_code=401, detail="未認証またはセッションが無効")
            # セッションIDに紐づくユーザーIDの取得
            user_id = sessions[session_id]
            # book_genresに登録
            crud.create_book_genre(db, genre_id=book_genre.id, user_id=user_id, book_id=book_id)
        else:
            # ジャンルがDBにない場合場合の処理
            print("ジャンル名に一致するものがありません。")
    else:
        # ジャンルが None または空文字列の場合の処理
        print("ジャンル名が指定されていません。")
# タグをリストから取り出し登録がなければタグを登録し、各タグをbook_tagsに登録する処理（検討中）
def process_tags(request: Request, db: Session, tags: list, book_id: int):
    # セッションIDの取得
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")
    
    # セッションIDに紐づくユーザーIDの取得
    user_id = sessions[session_id]
    # ユーザー情報の取得（仮示）
    for tag_name in tags:
        # リクエストのタグが既に存在するか
        tag = crud.get_tag_by_name(db, name=tag_name)
        if not tag:
            # 新規タグを登録
            tag = crud.create_tag(db, name=tag_name)
        # tag_idを取得
        tag_id=tag.id
        # book_tagsに登録
        crud.create_book_tag(db, user_id=user_id, book_id=book_id, tag_id=tag_id)
    