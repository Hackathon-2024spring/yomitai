from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User_award,Award
# from app.calculation import (
#     calculate_consecutive_reading_days,
#     calculate_total_pages_read,
#     calculate_reading_sessions,
#     calculate_books_read
#     )
from ..session_store import sessions

router = APIRouter()
@router.get("/")

def get_next_goal(award_type: str, current_criteria: int) -> int:
    goal_data = {
        "days": [3, 7, 15, 30, 150, 365],
        "times": [1, 5, 10, 100],
        "pages": [100, 1000, 10000],
        "books": [1, 5, 10, 50, 100],
    }
    goals = goal_data.get(award_type, [])
    for goal in goals:
        if goal > current_criteria:
            return goal
    return -1 # すべての目標が達成されている場合

def read_awards(request: Request, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未承認またはセッションが無効")

    user_id= sessions[session_id]

    # user_awardsテーブルからデータを取得しユーザーIDでフィルター
    user_awards = db.query(User_award).filter(User_award.user_id == user_id).all()

    # アワードの詳細情報を取得
    award_details = []  # リストの初期化

    for user_award in user_awards:
        next_goal = get_next_goal(user_award.award.award_type,user_award.award.award_criteria)
        is_max_goal = next_goal == -1
        if is_max_goal:
            next_goal = user_award.award.award_criteria

        award_details.append({
            "award_name": user_award.award.award_name,
            "award_type": user_award.award.award_type,
            "award_criteria": user_award.award.award_criteria,
            "award_date": user_award.award_date,
            "next_goal": next_goal,
            "is_max_goal": is_max_goal
        })

    return {"user_awards": award_details}



#     # 各表彰基準を計算
#     streak = calculate_consecutive_reading_days(user_id, db)
#     total_pages = calculate_total_pages_read(user_id, db)
#     reading_sessions = calculate_reading_sessions(user_id, db)
#     books_read = calculate_books_read(user_id, db)

#     awards_to_give = []
#     all_awards = db.query(Award).all()

#     # 未達成の目標を管理
#     next_goals_by_category = defaultdict(list)

#     # それぞれの種類のawardをチェック
#     for award in all_awards:
#         if award.award_name:  # award_nameが空でないことを確認
#             digits = ''.join(filter(str.isdigit, award.award_name))
#             if digits:
#                 threshold = int(digits)
#             else:
#                 threshold = 0  # 適切なデフォルト値またはエラーハンドリング
#                 logging.error(f"Invalid award name detected: {award.award_name}")
#         else:
#             continue
#         achieved = False
#         if "連続読書日数" in award.award_name and streak >= threshold:
#             awards_to_give.append(award.award_name)
#             achieved = True
#         if "読書ページ" in award.award_name and total_pages >= threshold:
#             awards_to_give.append(award.award_name)
#             achieved = True
#         if "読書回数" in award.award_name and reading_sessions >= threshold:
#             awards_to_give.append(award.award_name)
#             achieved = True
#         if "読書" in award.award_name and "冊" in award.award_name and books_read >= threshold:
#             awards_to_give.append(award.award_name)
#             achieved = True

#         if not achieved:
#             category = award.award_name.split()[0]  # 分野名を取得
#             next_goals_by_category[category].append((award.award_name, threshold))

#     # 各分野で最も達成に近い目標を決定
#     closest_goals = {category: min(goals, key=lambda x: x[1], default=None)
#                  for category, goals in next_goals_by_category.items()}

#     response_data = {
#         "achieved_awards": awards_to_give,
#         "next_goal": closest_goals
#     }

#     if not awards_to_give and not closest_goals:
#         return {"message": "No awards achieved"}
#     else:
#         return response_data
