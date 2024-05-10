from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import crud, models, schemas, database
from ..session_store import sessions
router = APIRouter()

# 新規書籍の登録と関連処理を実行するエンドポイント
@router.post("/", response_model=schemas.MyBook)

def process_book_registration(request: Request,book: schemas.CreateBook, db: Session = Depends(database.get_db)):
    db_book = None

    # セッションIDの取得
    session_id = ""
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")
  
    # セッションIDに紐づくユーザーIDの取得
    user_id = sessions[session_id]

    # ジャンルを検索しジャンルIDを取得
    genre = crud.get_genre_by_name(db, name=book.genre)
    # if not genre:
    #     raise HTTPException(status_code=404, detail="ジャンルが見つかりません")
    genre_id = genre.id if genre else None  # ジャンルが見つからない場合はNoneを使用


    if book.isbn_code != "":
        # ISBNに合致するbooksレコードを取得
        db_book = crud.get_book_by_isbn(db, isbn=book.isbn_code)
        # デバック用
        print("取得したISBNコードは以下")
        # if not db_book.isbn_code:
        #     print("ISBNなし")
        # else:
        #     print(db_book.isbn_code)
        # ISBNがレコードにあるかどうかで条件分岐
        if db_book:
            # my_bookに登録
            book_id = db_book.id
            # デバック用
            print("ISBNがあったのでmy_book作成")
            db_book = crud.create_my_book(db, book=book, user_id=user_id, genre_id=genre_id, book_id=book_id)
        
        else:
            # my_booksとbooksに登録
            # デバック用
            print("ISBNがないのでmy_bookとbook作成")
            db_book = crud.create_book_and_my_book(db, book=book, user_id=user_id, genre_id=genre_id)

    else:
        # 手動登録でmy_booksに登録
        db_book = crud.munual_create_my_book(db,book=book, user_id=user_id, genre_id=genre_id)



    process_tags(db, book.tag, db_book.id)
    return db_book

def process_tags(db: Session, tags: list, db_book_id: int):
    for tag_name in tags:
        # リクエストのタグが既に存在するか
        tag = crud.get_tag_by_name(db, tag_name=tag_name)
        if not tag:
            # 新規タグを登録
            tag = crud.create_tag(db, tag_name=tag_name)
        # tag_idを取得
        tag_id=tag.id
        # book_tagsに登録
        crud.create_book_tag(db, my_book_id=db_book_id, tag_id=tag_id)
    