from fastapi import APIRouter, Response

router = APIRouter()

@router.post("/")

def logout(response: Response):
    # クッキーからセッションIDを削除
    response.delete_cookie("session_id")
    return {"message": "Logged out"}
