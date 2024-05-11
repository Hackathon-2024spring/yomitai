from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import get_db
from ..session_store import sessions

router = APIRouter()

@router.post("/")
def get_my_books_titile(request: Request, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")

    user_id = sessions[session_id]

    # users, books, daily_logs, reading_sessionsを内部結合し、
    # セッションIDからuser.idを取得し、end_dateがnullであるものをフィルタ
    title_list = []
    my_books = db.query(models.My_book).filter(
        models.My_book.user_id == user_id,
    ).all()

    for book in my_books:
       title_list.append({"my_book_id": book.id, "my_book_title": book.title})

    return title_list
