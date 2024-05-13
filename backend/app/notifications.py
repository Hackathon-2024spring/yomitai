from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models import Reading_session, Book, Daily_log, User
import boto3
from .database import SessionLocal

print("アラート判定関数を実行します")

def calculate_milestones(start_date, end_date):
    """読書セッションの開始日と目標終了日から、50%および80%のマイルストーン日を計算する"""
    total_days = (end_date - start_date).days
    milestone_50 = start_date + timedelta(days=round(total_days * 0.5))
    milestone_80 = start_date + timedelta(days=round(total_days * 0.8))
    return {
        "50%": milestone_50,
        "80%": milestone_80
    }

def get_current_progress(book_id, db):
    """指定された本の総読書ページ数を返す"""
    logs = db.query(Daily_log).filter(Daily_log.book_id == book_id).all()
    total_pages_read = sum(log.page_read for log in logs)
    return total_pages_read

def get_user_email(user_id, db):
    """指定されたユーザーIDに基づいてユーザーのメールアドレスを取得する"""
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        return user.email
    else:
        return None  # ユーザーが見つからない場合はNoneを返す

def check_progress_and_notify():
    db = SessionLocal()
    try:
        # 現在の日付を取得
        today = datetime.now().date()

        # すべてのアクティブな読書セッションを取得
        active_sessions = db.query(Reading_session).filter(Reading_session.end_date == None).all()

        for session in active_sessions:
            #本の登録があるかの確認
            book = db.query(Book).filter(Book.id == session.book_id).first()
            if not book:
                continue

            user_email = get_user_email(session.user_id, db)  # ユーザーIDからメールアドレスを取得
            if not user_email:
                continue  # メールアドレスが取得できない場合は通知をスキップ

            #　目標に対して読み終わっているべきページ数の計算
            total_pages_read = get_current_progress(book.id, db)
            milestones = calculate_milestones(session.start_date, session.planned_end_date)
            expected_progress_50 = round(book.total_page * 0.5)
            expected_progress_80 = round(book.total_page * 0.8)

            #　目標の対して遅れている場合メール送信
            ses_client = boto3.client('ses', region_name='ap-northeast-1') #　SESのリージョンに合わせる

            if today >= milestones['50%'].date() and total_pages_read < expected_progress_50:
                send_email(ses_client, user_email, "50% Progress Alert", "You are behind 50% of your reading goal.")

            if today >= milestones['80%'].date() and total_pages_read < expected_progress_80:
                send_email(ses_client, user_email, "80% Progress Alert", "You are behind 80% of your reading goal.")
    finally:
        db.close()

def send_email(ses_client, recipient_email, subject, body):
    # AWS SESを介してメール送信
    ses_client.send_email(
        Source='your-verified-email@example.com', #SESの送信元のemailアドレスに変える
        Destination={'ToAddresses': [recipient_email]},
        Message={
            'Subject': {'Data': subject},
            'Body': {'Text': {'Data': body}},
        }
    )

if __name__ == "__main__":
    check_progress_and_notify()
