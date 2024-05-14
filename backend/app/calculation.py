from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Daily_log, My_book, Genre
from itertools import groupby # 円グラフ用集計で使用
import datetime
from datetime import timedelta

# グラフページ
# 棒グラフ用集計
def calculate_pages_read_daily(db: Session, user_id: int, start_date: datetime.date, end_date: datetime.date):
    """指定された期間の日ごとのページ数を計算"""
    daily_data = db.query(
        func.date_format(Daily_log.date, '%Y-%m-%d').label('day'),  # 日付を週単位で切り詰める
        func.sum(Daily_log.page_read).label('pages')            # 各週の読書ページ数の合計を計算
    ).join(My_book, My_book.id == Daily_log.my_book_id).filter(                          # Daily_logとMy_bookを結合
        My_book.user_id == user_id,                            # 特定のユーザーに絞り込む
        Daily_log.date >= start_date,                          # 開始日以降のデータに絞り込む
        Daily_log.date <= end_date                             # 終了日以前のデータに絞り込む
    ).group_by('day').order_by('day').all()                 # 日単位でグループ化し、日の順に並べる

    # 日ごとの合計読書ページ数をリストとして出力する
    return [{'day': day, 'pages': pages} for day, pages in daily_data]

def calculate_pages_read_monthly(db: Session, user_id: int, start_date: datetime.date, end_date: datetime.date):
    """指定された期間の月ごとのページ数を計算"""
    monthly_data = db.query(
        func.date_format(Daily_log.date, '%Y-%m').label('month'),
        func.sum(Daily_log.page_read).label('pages')
    ).join(My_book, My_book.id == Daily_log.my_book_id).filter(
        My_book.user_id == user_id,
        Daily_log.date >= start_date,
        Daily_log.date <= end_date
    ).group_by('month').order_by('month').all()

    return [{'month': month, 'pages': pages} for month, pages in monthly_data]

# 円グラフ用集計
def calculate_genre_distribution_daily(db: Session, user_id: int, start_date: datetime.date, end_date: datetime.date):
    """指定された期間の日ごとのジャンル別読書ページ数の割合を計算"""
    genre_data = db.query(
        func.date_format(Daily_log.date, '%Y-%m-%d').label('day'),
        Genre.name.label('genre'),
        func.sum(Daily_log.page_read).label('pages')
    ).join(My_book, My_book.id == Daily_log.my_book_id).join(Genre, My_book.genre_id == Genre.id).filter(
        My_book.user_id == user_id,
        Daily_log.date >= start_date,
        Daily_log.date <= end_date
    ).group_by('day', 'genre').order_by('day', 'genre').all()

    total_pages_per_day = {day: sum(item.pages for item in group) for day, group in groupby(genre_data, key=lambda x: x.day)}

   # 各ジャンルの割合を計算、小数点以下２桁で丸める
    genre_percentages = [{'day': day, 'genre': item.genre, 'percentage': round((item.pages / total_pages_per_day[day]) * 100, 2) if total_pages_per_day[day] > 0 else 0} for day, items in groupby(genre_data, key=lambda x: x.day) for item in items]


    return genre_percentages

def calculate_genre_distribution_monthly(db: Session, user_id: int, start_date: datetime.date, end_date: datetime.date):
    """指定された期間の月ごとのジャンル別読書ページ数の割合を計算"""
    genre_data = db.query(
        func.date_format(Daily_log.date, '%Y-%m').label('month'),
        Genre.name.label('genre'),
        func.sum(Daily_log.page_read).label('pages')
    ).join(My_book, My_book.id == Daily_log.my_book_id).join(Genre, My_book.genre_id == Genre.id).filter(
        My_book.user_id == user_id,
        Daily_log.date >= start_date,
        Daily_log.date <= end_date
    ).group_by('month', 'genre').order_by('month', 'genre').all()

    total_pages_per_month = {month: sum(item.pages for item in group) for month, group in groupby(genre_data, key=lambda x: x.month)}

    # 各ジャンルの割合を計算、小数点以下２桁で丸める
    genre_percentages = [{'month': month, 'genre': item.genre, 'percentage': round((item.pages / total_pages_per_month[month]) * 100, 2) if total_pages_per_month[month] > 0 else 0} for month, items in groupby(genre_data, key=lambda x: x.month) for item in items]

    return genre_percentages


# ミッションページ
# 連続読書日数の計算
def calculate_consecutive_reading_days(user_id: int, db: Session):
    # データベースからユーザーの読書ログを取得
    logs = db.query(Daily_log).join(My_book, Daily_log.my_book_id == My_book.id).filter(My_book.user_id == user_id).order_by(Daily_log.date).all()

    if not logs:
        return 0

    current_streak = 1
    previous_date = logs[0].date

    for log in logs[1:]:
        if log.date == previous_date + timedelta(days=1):
            current_streak += 1
        else:
            if log.date != previous_date:
                current_streak = 1
        previous_date = log.date

    return current_streak

# 読書ページ数の計算
def calculate_total_pages_read(user_id: int, db: Session):
    logs = db.query(Daily_log).join(My_book, Daily_log.my_book_id == My_book.id).filter(My_book.user_id == user_id).all()
    total_pages = sum(log.page_read for log in logs if log.page_read)
    return total_pages

# 読書記録の回数の計算
def calculate_reading_sessions(user_id: int, db: Session):
    count = db.query(Daily_log).join(My_book, Daily_log.my_book_id == My_book.id).filter(My_book.user_id == user_id).count()
    return count

# 読書した本の数の計算
def calculate_books_read(user_id: int, db: Session):
    books_read_count = db.query(My_book).filter(My_book.user_id == user_id, My_book.end_date != None).count()
    return books_read_count

