from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Daily_log, My_book, Genre
from itertools import groupby # 円グラフ用集計で使用
import datetime


# 棒グラフ用集計
def calculate_pages_read_weekly(db: Session, user_id: int, start_date: datetime.date, end_date: datetime.date):
    """指定された期間の週ごとのページ数を計算"""
    weekly_data = db.query(
        func.date_format(Daily_log.date, '%Y-%u').label('week'),  # 日付を週単位で切り詰める
        func.sum(Daily_log.page_read).label('pages')            # 各週の読書ページ数の合計を計算
    ).join(My_book, My_book.id == Daily_log.my_book_id).filter(                          # Daily_logとMy_bookを結合
        My_book.user_id == user_id,                            # 特定のユーザーに絞り込む
        Daily_log.date >= start_date,                          # 開始日以降のデータに絞り込む
        Daily_log.date <= end_date                             # 終了日以前のデータに絞り込む
    ).group_by('week').order_by('week').all()                 # 週単位でグループ化し、週の順に並べる

    # 週ごとの合計読書ページ数をリストとして出力する
    return [{'week': week, 'pages': pages} for week, pages in weekly_data]

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


def calculate_pages_read_yearly(db: Session, user_id: int, start_date: datetime.date, end_date: datetime.date):
    """指定された期間の年ごとのページ数を計算"""
    yearly_data = db.query(
        func.date_format(Daily_log.date, '%Y').label('year'),
        func.sum(Daily_log.page_read).label('pages')
    ).join(My_book, My_book.id == Daily_log.my_book_id).filter(
        My_book.user_id == user_id,
        Daily_log.date >= start_date,
        Daily_log.date <= end_date
    ).group_by('year').order_by('year').all()

    return [{'year': year, 'pages': pages} for year, pages in yearly_data]

# 円グラフ用集計
def calculate_genre_distribution_weekly(db: Session, user_id: int, start_date: datetime.date, end_date: datetime.date):
    """指定された期間の週ごとのジャンル別読書ページ数の割合を計算"""
    genre_data = db.query(
        func.date_format(Daily_log.date, '%Y-%u').label('week'),
        Genre.name.label('genre'),
        func.sum(Daily_log.page_read).label('pages')
    ).join(My_book, My_book.id == Daily_log.my_book_id).join(Genre, My_book.genre_id == Genre.id).filter(
        My_book.user_id == user_id,
        Daily_log.date >= start_date,
        Daily_log.date <= end_date
    ).group_by('week', 'genre').order_by('week', 'genre').all()

    total_pages_per_week = {week: sum(item.pages for item in group) for week, group in groupby(genre_data, key=lambda x: x.week)}

   # 各ジャンルの割合を計算、小数点以下２桁で丸める
    genre_percentages = [{'week': week, 'genre': item.genre, 'percentage': round((item.pages / total_pages_per_week[week]) * 100, 2) if total_pages_per_week[week] > 0 else 0} for week, items in groupby(genre_data, key=lambda x: x.week) for item in items]


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

def calculate_genre_distribution_yearly(db: Session, user_id: int, start_date: datetime.date, end_date: datetime.date):
    """指定された期間の年ごとのジャンル別読書ページ数の割合を計算"""
    genre_data = db.query(
        func.date_format(Daily_log.date, '%Y').label('year'),
        Genre.name.label('genre'),
        func.sum(Daily_log.page_read).label('pages')
    ).join(My_book, My_book.id == Daily_log.my_book_id).join(Genre, My_book.genre_id == Genre.id).filter(
        My_book.user_id == user_id,
        Daily_log.date >= start_date,
        Daily_log.date <= end_date
    ).group_by('year', 'genre').order_by('year', 'genre').all()

    total_pages_per_year = {year: sum(item.pages for item in group) for year, group in groupby(genre_data, key=lambda x: x.year)}

    # 各ジャンルの割合を計算、小数点以下２桁で丸める
    genre_percentages = [{'year': year, 'genre': item.genre, 'percentage': round((item.pages / total_pages_per_year[year]) * 100, 2) if total_pages_per_year[year] > 0 else 0} for year, items in groupby(genre_data, key=lambda x: x.year) for item in items]


    return genre_percentages
