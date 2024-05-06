# create_daily_log.py
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
from ..session_store import sessions
from app.notifications import check_and_notify  # 通知用の関数をインポート

router = APIRouter()

@router.post("/")
def read_book(request: Request, daily_log: schemas.ReadBookRequest, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")

    user_id = sessions[session_id]

    book = crud.get_book_by_user_and_title(db, user_id, daily_log.title)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    crud.create_log(

        db=db,
        user_id=user_id,
        book_id=book.id,
        page_read=daily_log.page_read,
        reading_date=daily_log.reading_date,
        memo_text=f"{daily_log.reading_date}: {daily_log.memo}"
    )

    # ユーザーのメールアドレスをセッションから取得
    user_email = crud.get_user_email_from_session(session_id, db)

    # 進捗確認と通知を行う
    check_and_notify(session_id=user_id, user_email=user_email, db_session=db)
    return {"message": "Reading log and memo saved successfully"}
