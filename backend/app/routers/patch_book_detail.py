from fastapi import APIRouter, HTTPException, Request, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..session_store import sessions

router = APIRouter()

@router.patch("/books/{my_book_id}")
async def update_book(request: Request, my_book_id: int, book_update: schemas.BookUpdate, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未認証またはセッションが無効")

    user_id = sessions[session_id]

    # データベースからbook_idに該当する書籍を検索
    my_book = db.query(models.My_book).filter(models.My_book.id == my_book_id,
    models.My_book.user_id == user_id).first()
    
    # 存在しない場合はエラーを返す
    if not my_book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    # 更新処理。提供されたフィールドのみを更新
    book_data = book_update.dict(exclude_unset=True)
    for key, value in book_data.items():
        setattr(my_book, key, value)
    
    db.add(my_book)
    db.commit()
    db.refresh(my_book)

    return my_book