from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from app.calculation import (
    calculate_pages_read_weekly,
    calculate_pages_read_monthly,
    calculate_pages_read_yearly,
    calculate_genre_distribution_weekly,
    calculate_genre_distribution_monthly,
    calculate_genre_distribution_yearly
    )
from ..session_store import sessions

router = APIRouter()

@router.get("/")

def get_reading_statistics(request: Request, start_date: str, end_date: str, period: str, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未承認またはセッションが無効")

    user_id= sessions[session_id]

    try:
        # 日付を適切に処理
        start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()

        # 棒グラフ用　ページ数の集計
        if period == 'weekly':
            pages_summary = calculate_pages_read_weekly(db, user_id, start_date, end_date)
        elif period == 'monthly':
            pages_summary = calculate_pages_read_monthly(db, user_id, start_date, end_date)
        elif period == 'yearly':
            pages_summary = calculate_pages_read_yearly(db, user_id, start_date, end_date)
        else:
            raise ValueError("Invalid period specified")

        # 円グラフ用　ジャンル別の集計
        if period == 'weekly':
            genre_summary = calculate_genre_distribution_weekly(db, user_id, start_date, end_date)
        elif period == 'monthly':
            genre_summary = calculate_genre_distribution_monthly(db, user_id, start_date, end_date)
        elif period == 'yearly':
            genre_summary = calculate_genre_distribution_yearly(db, user_id, start_date, end_date)
        else:
            raise ValueError("Invalid period specified")

        return {
            "pages_summary": pages_summary,
            "genre_summary": genre_summary
        }
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

