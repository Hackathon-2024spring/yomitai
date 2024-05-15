from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session, joinedload
from .. import crud, schemas, models
from ..database import get_db
from ..session_store import sessions
from sqlalchemy import func
import datetime

router = APIRouter()

@router.get("/")
def get_library(request: Request, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")

    user_id = sessions[session_id]

    my_books = db.query(models.My_book).\
        options(joinedload(models.My_book.book_tag).joinedload(models.Book_tag.tag)).\
        filter(models.My_book.user_id == user_id).\
        all()

    library_list = []

    for book in my_books:
        # 各bookに紐づくタグ名を抽出
        tags = [tag.tag.tag_name for tag in book.book_tag]
        library_list.append({
            "book_id": book.id,
            "book_title": book.title,
            "end_date": book.end_date,
            "image": book.image,
            "tags": tags  # タグ名のリスト
        })

    return library_list