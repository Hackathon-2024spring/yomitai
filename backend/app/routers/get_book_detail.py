from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import models
from ..database import get_db
from ..session_store import sessions
from sqlalchemy


router = APIRouter()

@router.post("/")
def get_book_detail(request: Request, my_book_id: int, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")

    user_id = sessions[session_id]

    book_details_list = []
    tag_list = []
    memo_list = []
    my_book = db.query(models.My_book).\
        filter(models.My_book.id == my_book_id,
               models.My_book.user_id == user_id
        ).first()

    book_detail = {}
    if my_book:
        book_detail = {column.name: getattr(my_book, column.name) for column in my_book.__table__.columns}
        book_details_list = [book_detail]

    tag_list = []
    tags = db.query(models.Book_tag, models.Tag).\
        join(models.Tag, models.Book_tag.tag_id == models.Tag.id).\
        filter(models.Book_tag.my_book_id == my_book_id).\
        all()
    for book_tag, tag in tags:
        tag_list.append({"book_tags.id": book_tag.id, "tag_name": tag.tag_name})

    memo_list = []
    memos = db.query(models.Daily_log).\
        filter(models.Daily_log.my_book_id == my_book_id).\
        all()
    for memo in memos:
        memo_list.append({"daily_logs.id": memo.id, "memo": memo.memo})


    response = {
        "book_detail": book_details_list,
        "tags_list": tag_list,
        "memo_list": memo_list
    }

    return response
