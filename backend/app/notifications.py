from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models import Reading_session, Book, Daily_log
import boto3

def calculate_milestones(start_date, end_date):
    total_days = (end_date - start_date).days
    return {
        "25%": start_date + timedelta(days=total_days * 0.25),
        "50%": start_date + timedelta(days=total_days * 0.5),
        "75%": start_date + timedelta(days=total_days * 0.75),
    }

def get_reading_progress(session_id: int, db: Session):
    # セッション、書籍、およびログデータを取得
    session = db.query(Reading_session).filter(Reading_session.id == session_id).first()
    book = db.query(Book).filter(Book.id == session.book_id).first()
    logs = db.query(Daily_log).filter(Daily_log.book_id == book.id).all()


    milestones = calculate_milestones(session.start_date, session.planned_end_date)
    pages_read = sum(log.pages_read for log in logs)

    return {
        "milestones": milestones,
        "total_pages": book.total_page,
        "pages_read": pages_read,
    }

def check_and_notify(session_id: int, user_email: str, db: Session):
    progress = get_reading_progress(session_id, db)

    # 期待されるページ数の計算
    expected_pages = {
        "25%": progress["total_pages"] * 0.25,
        "50%": progress["total_pages"] * 0.5,
        "75%": progress["total_pages"] * 0.75,
    }

    # 各マイルストーンを確認し通知
    now = datetime.now()
    ses_client = boto3.client('ses', region_name='ap-northeast-1')

    for milestone, due_date in progress["milestones"].items():
        if now > due_date and progress["pages_read"] < expected_pages[milestone]:
            # メール内容の準備
            subject = f"進捗アラート: {milestone} 達成できていません"
            body = f"{milestone}の進捗に達していません。進捗状況を確認してください。"

            # AWS SESを介してメール送信
            ses_client.send_email(
                Source='your-verified-email@example.com', #SESの送信元のemailアドレスに変える
                Destination={'ToAddresses': [user_email]},
                Message={
                    'Subject': {'Data': subject},
                    'Body': {'Text': {'Data': body}},
                }
            )
