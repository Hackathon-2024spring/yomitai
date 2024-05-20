from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Award
from app.calculation import (
    calculate_consecutive_reading_days,
    calculate_total_pages_read,
    calculate_reading_sessions,
    calculate_books_read
    )
from ..session_store import sessions
from collections import defaultdict
import logging

router = APIRouter()

@router.get("/")

def read_awards(request: Request, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未承認またはセッションが無効")

    user_id= sessions[session_id]

    # 各表彰基準を計算
    streak = calculate_consecutive_reading_days(user_id, db)
    total_pages = calculate_total_pages_read(user_id, db)
    reading_sessions = calculate_reading_sessions(user_id, db)
    books_read = calculate_books_read(user_id, db)

    awards_to_give = []
    all_awards = db.query(Award).all()

    # 未達成の目標を管理
    next_goals_by_category = defaultdict(list)

    # それぞれの種類のawardをチェック
    for award in all_awards:
        if award.award_name:  # award_nameが空でないことを確認
            digits = ''.join(filter(str.isdigit, award.award_name))
            if digits:
                threshold = int(digits)
            else:
                threshold = 0  # 適切なデフォルト値またはエラーハンドリング
                logging.error(f"Invalid award name detected: {award.award_name}")
        else:
            continue
        achieved = False
        if "連続読書日数" in award.award_name and streak >= threshold:
            awards_to_give.append(award.award_name)
            achieved = True
        if "読書ページ" in award.award_name and total_pages >= threshold:
            awards_to_give.append(award.award_name)
            achieved = True
        if "読書回数" in award.award_name and reading_sessions >= threshold:
            awards_to_give.append(award.award_name)
            achieved = True
        if "読書" in award.award_name and "冊" in award.award_name and books_read >= threshold:
            awards_to_give.append(award.award_name)
            achieved = True

        if not achieved:
            category = award.award_name.split()[0]  # 分野名を取得
            next_goals_by_category[category].append((award.award_name, threshold))

    # 各分野で最も達成に近い目標を決定
    closest_goals = {category: min(goals, key=lambda x: x[1], default=None)
                 for category, goals in next_goals_by_category.items()}

    response_data = {
        "achieved_awards": awards_to_give,
        "next_goal": closest_goals
    }

    if not awards_to_give and not closest_goals:
        return {"message": "No awards achieved"}
    else:
        return response_data
