# create_daily_log.py
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
from ..session_store import sessions

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
    
    return {"message": "Reading log and memo saved successfully"}