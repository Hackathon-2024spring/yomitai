# create_daily_log.py
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
from ..session_store import sessions
from .. import models
from datetime import date
from sqlalchemy import func
from datetime import timedelta


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
    

    # 読書回数の表彰判定
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
        print("読書回数の表彰を記録しました")
    else:
        pass
        print("読書回数の表彰追加はありません")


    # 読書ページの表彰判定
    total_pages = db.query(models.Daily_log).join(models.My_book).filter(models.My_book.user_id == user_id).with_entities(func.sum(models.Daily_log.page_read)).scalar()

    # awardsテーブルのcriteriaと一致するレコードを取得
    award_criteria = db.query(models.Award).filter(models.Award.award_type == "pages", models.Award.award_criteria <= total_pages).first()

    if award_criteria:
        # awardsテーブルのcriteria以下の場合、user_awardに同じaward_idが存在しないか確認
        existing_user_award = db.query(models.User_award).filter(models.User_award.user_id == user_id, models.User_award.award_id == award_criteria.id).first()
        if not existing_user_award:
            # user_awardに同じaward_idが存在しない場合、レコードを追加
            new_user_award = models.User_award(
                award_date=date.today(),
                user_id=user_id,
                award_id=award_criteria.id
            )
            db.add(new_user_award)
            db.commit()
            print("読書ページの表彰を記録しました")
        else:
            print("既に記録されています")
    else:
        print("読書ページの表彰追加はありません")


    # 読了数の表彰判定
    completed_books_count = db.query(models.My_book).filter(models.My_book.user_id == user_id, models.My_book.end_date != None).count()

    # awardsテーブルのcriteriaと一致するレコードを取得
    award_criteria = db.query(models.Award).filter(models.Award.award_type == "books", models.Award.award_criteria <= completed_books_count).first()

    if award_criteria:
        # awardsテーブルのcriteria以下の場合、user_awardに同じaward_idが存在しないか確認
        existing_user_award = db.query(models.User_award).filter(models.User_award.user_id == user_id, models.User_award.award_id == award_criteria.id).first()
        if not existing_user_award:
            # user_awardに同じaward_idが存在しない場合、レコードを追加
            new_user_award = models.User_award(
                award_date=date.today(),
                user_id=user_id,
                award_id=award_criteria.id
            )
            db.add(new_user_award)
            db.commit()
            print("読書冊数の表彰を記録しました")
        else:
            print("既に記録されています")
    else:
        print("読書冊数の表彰追加はありません") 


    # 連続読書日数の表彰判定
    log_dates = db.query(models.Daily_log.date).join(models.My_book).filter(models.My_book.user_id == user_id).order_by(models.Daily_log.date.desc()).all()

    # 連続読書日数の初期値を設定
    consecutive_days = 1

    # 日付の差が1日ずつ続いているか判定
    for i in range(len(log_dates) - 1):
        if log_dates[i][0] - log_dates[i + 1][0] == timedelta(days=1):
            consecutive_days += 1
        else:
            break

    # awardsテーブルのcriteriaと一致するレコードを取得
    award_criteria = db.query(models.Award).filter(models.Award.award_type == "days", models.Award.award_criteria == consecutive_days).first()

    if award_criteria:
        # awardsテーブルのcriteriaと一致する場合、user_awardにレコードを追加
        new_user_award = models.User_award(
            award_date=date.today(),
            user_id=user_id,
            award_id=award_criteria.id
        )
        db.add(new_user_award)
        db.commit()
        print("連続読書日数の表彰を記録しました")
    else:
        print("連続読書日数の表彰追加はありません")


    return {"message": "Reading log and memo saved successfully"}