from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from ..database import get_db
from app.calculation import (
    calculate_pages_read_daily,
    calculate_pages_read_monthly,
    calculate_genre_distribution_daily,
    calculate_genre_distribution_monthly,
    calculate_total_pages_read_period
)
from ..session_store import sessions

router = APIRouter()

@router.get("/")

def get_reading_statistics(request: Request, start_date: str, end_date: str, period: str, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未承認またはセッションが無効")

    user_id= sessions[session_id]

    end_date = datetime.today().date()  # 今日の日付

    if period == 'weekly':
        start_date = end_date - timedelta(days=7)
        pages_summary = calculate_pages_read_daily(db, user_id, start_date, end_date)
        genre_summary = calculate_genre_distribution_daily(db, user_id, start_date, end_date)
        total_pages = calculate_total_pages_read_period(db, user_id, start_date, end_date)
    elif period == 'monthly':
        start_date = end_date - timedelta(days=30)
        pages_summary = calculate_pages_read_daily(db, user_id, start_date, end_date)
        genre_summary = calculate_genre_distribution_daily(db, user_id, start_date, end_date)
        total_pages = calculate_total_pages_read_period(db, user_id, start_date, end_date)
    elif period == 'yearly':
        start_date = end_date - timedelta(days=365)
        pages_summary = calculate_pages_read_monthly(db, user_id, start_date, end_date)
        genre_summary = calculate_genre_distribution_monthly(db, user_id, start_date, end_date)
        total_pages = calculate_total_pages_read_period(db, user_id, start_date, end_date)
    else:
        raise ValueError("Invalid period specified")

    return {
        "pages_summary": pages_summary,
        "genre_summary": genre_summary,
        "total_pages_read": total_pages,
        }

