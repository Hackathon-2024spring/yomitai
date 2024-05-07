from datetime import datetime, date
from pydantic import BaseModel, Field
from typing import Optional, List

class UserBase(BaseModel):
    # UserBase クラスは BaseModel を継承しており、Pydantic の全機能を利用できる
    user_name:str
    email:str

class UserCreate(UserBase):
    # UserCreate クラスは UserBase を継承しており、UserBase に定義された属性に加えて追加の属性を定義できる
    password: str = Field(min_length=8)
    confirm_password: str = Field(min_length=8)#ここに確認用パスワード追加

class User(UserBase):
    id:int
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

    class Config:
        orm_mode = True


class Book(BaseModel):
    title: str
    author: str
    publisher: str
    total_page: int
    isbn: Optional[str] = None
    image: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class BookCreate(Book):
    planned_end_date: date
    genre: str
    tag: list[str] = []

class ReadingSession(BaseModel):
    start_date: date
    planned_end_date: date
    end_date: Optional[date] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class Tag(BaseModel):
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class Genre(BaseModel):
    name: str


class BookGenre(BaseModel):
    created_at: datetime
    updated_at: datetime

class ReadBookRequest(BaseModel):
    title: str
    page_read: int
    memo: str
    reading_date: date
    created_at: datetime
    updated_at: datetime
   

class DailyLog(BaseModel):
    title: str
    page_read: int
    memo: str
    reading_date: date
    created_at: datetime
    updated_at: datetime

class BookMemo(BaseModel):
    memo: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class Award(BaseModel):
    name: str
    created_at: datetime
    updated_at: datetime

class UserAward(BaseModel):
    award_date: date
    created_at: datetime

class AwardCriteria(BaseModel):
    type: str
    value: int
    created_at: datetime
    updated_at: datetime

