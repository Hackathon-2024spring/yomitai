# create_daily_log.py
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
from ..session_store import sessions
from .. import models
from datetime import date

router = APIRouter()

@router.post("/")
def read_book(request: Request, daily_log: schemas.ReadBookRequest, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")

    user_id = sessions[session_id]

    book = crud.get_my_book_by_user_and_title(db, user_id, daily_log.title)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    crud.create_log(
        db=db,
        my_book_id=book.id,
        page_read=daily_log.page_read,
        reading_date=daily_log.reading_date,
        memo_text=f"{daily_log.reading_date}: {daily_log.memo}"
    )
    
    # daily_logの数をカウント
    log_count = db.query(models.Daily_log).join(models.My_book).filter(models.My_book.user_id == user_id).count()

    # awardsテーブルのcriteriaと一致するレコードを取得
    award_criteria = db.query(models.Award).filter(models.Award.award_type == "times", models.Award.award_criteria == log_count).first()

    if award_criteria:
        # awardsテーブルのcriteriaと一致する場合、user_awardにレコードを追加
        new_user_award = models.User_award(
            award_date = date.today(),
            user_id = user_id,
            award_id = award_criteria.id
        )
        db.add(new_user_award)
        db.commit()
        print("記録しました")
    else:
        pass
        print("レコードなし")

    return {"message": "Reading log and memo saved successfully"}