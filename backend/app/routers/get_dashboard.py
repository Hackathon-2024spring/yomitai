from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import crud, schemas, models
from ..database import get_db
from ..session_store import sessions
from sqlalchemy import func
import datetime
from datetime import date

router = APIRouter()

@router.get("/")
def get_dashboard(request: Request, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")

    user_id = sessions[session_id]

    # users, books, daily_logs, reading_sessionsを内部結合し、
    # セッションIDからuser.idを取得し、end_dateがnullであるものをフィルタ
    dashboard_list = []
    my_books = db.query(models.My_book).filter(
        models.My_book.user_id == user_id,
        models.My_book.end_date == None
    ).all()

    for reading_book in my_books:
        book = db.query(models.My_book).filter(models.My_book.id == reading_book.id).first()
        total_pages_read = db.query(func.sum(models.Daily_log.page_read)).filter(
            models.Daily_log.my_book_id == book.id
        ).scalar() or 0
        progress_rate = (total_pages_read / book.total_page) * 100
        rounded_progress_rate = round(progress_rate)
        remaining_days = (book.planned_end_date - datetime.date.today())/(3600*24)

        dashboard_list.append({"book_title": book.title, "progress_rate": rounded_progress_rate, "remaining_days": remaining_days})


    # daily_logsのdateリストを取得
    # reading_date_list = [log.date for log in db.query(models.Daily_log.date).filter(models.Daily_log.user_id == user_id).all()]


    reading_date_list = db.query(models.Daily_log.date).\
        join(models.My_book, models.My_book.id == models.Daily_log.my_book_id).\
        filter(models.My_book.user_id == user_id).\
        all()
    # 結果セットからdate値を抽出しリスト化
    reading_date_list = [log.date for log in reading_date_list]
    unique_date = set(reading_date_list)
    reading_date=list(unique_date)

 
    # user_awardsのdateリストを取得
    award_date_list = db.query(models.User_award.award_date).\
        filter(models.User_award.user_id == user_id).\
        all()
    
    award_date_list = [award.award_date for award in award_date_list]
    award_unique_date = set(award_date_list)
    award_date = list(award_unique_date)


    response = {
        "dashboard": dashboard_list,
        "reading_dates": sorted(reading_date),
        "award_dates": sorted(award_date)
    }

    return response
