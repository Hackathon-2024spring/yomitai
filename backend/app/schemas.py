from datetime import datetime, date
from pydantic import BaseModel, Field
from typing import Optional, List


class UserBase(BaseModel):
    # UserBase クラスは BaseModel を継承しており、Pydantic の全機能を利用できる
    user_name: str
    email: str


class UserCreate(UserBase):
    # UserCreate クラスは UserBase を継承しており、UserBase に定義された属性に加えて追加の属性を定義できる
    password: str = Field(min_length=8)
    confirm_password: str = Field(min_length=8) # ここに確認用パスワード追加


class User(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class Login(BaseModel):
    user_name: str
    password: str


class DailyLog(BaseModel):
    title: str
    page_read: int
    date: date
    memo: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class BookBase(BaseModel):
    title: str
    author: str
    publisher: str
    total_page: int
    image: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class MyBook(BookBase):
    start_date: date
    planned_end_date: date

    class Config:
        orm_mode = True


class Book(BookBase):
    isbn_code: int

    class Config:
        orm_mode = True


class CreateBook(MyBook):
    isbn_code: Optional[str] = None
    genre: str
    tag: Optional[list] = []

    class Config:
        orm_mode = True

class ReadBookRequest(BaseModel):
    title: str
    page_read: int
    memo: str
    reading_date: date
    created_at: datetime
    updated_at: datetime


class Award(BaseModel):
    award_name: str
    created_at: datetime
    updated_at: datetime


class UserAward(BaseModel):
    award_date: date
    created_at: datetime
    created_at: datetime


class AwardCriteria(BaseModel):
    type: str
    value: int
    created_at: datetime
    updated_at: datetime