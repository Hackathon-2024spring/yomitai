from fastapi import APIRouter, HTTPException, Depends, Response, status
from sqlalchemy.orm import Session
from .. import database
from ..auth import authenticate_user
from ..schemas import Login
import secrets
from ..session_store import sessions  # session_store.pyからsessions辞書をインポート


router = APIRouter()


@router.post("/")
def login(
    login_data: Login, response: Response, db: Session = Depends(database.get_db)
):
    # ユーザー認証
    user = authenticate_user(db, login_data.user_name, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="IDまたはパスワードが間違っています",
        )

    # セッションIDを生成してクッキーに保存
    session_id = secrets.token_urlsafe()
    response.set_cookie(
        key="session_id", value=session_id, httponly=False, secure=False, samesite="Lax"
    )  # 本番環境ではsecure=TrueにしてHTTPS接続のみクッキーが設定されるように戻す！

    # セッションIDに対応するユーザーIDをインメモリストアに保存
    sessions[session_id] = user.id  # user.idは認証されたユーザーのID

    return {"session_id": session_id}
