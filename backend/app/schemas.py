from datetime import datetime, date
from pydantic import BaseModel


class User(BaseModel):
    user_name: str
    email: str
    password: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class UserCreate(User):
    pass



class DailyLog(BaseModel):
    page_read: int
    date: date
    created_at: datetime
    user_id: int
    book_id: int

    class Config:
        orm_mode = True


class Book(BaseModel):
    title: str
    author: str
    publisher: str
    total_page: int
    isbn_code: str
    image: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class ReadingSession(BaseModel):
    start_date: date
    planned_end_date: date
    end_date: date
    created_at: datetime
    updated_at: datetime
    
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







# class TaskBase(BaseModel):
#     title: str
#     done: bool = False


# class TaskCreate(TaskBase):
#     pass


# class Task(TaskBase):
#     id: int
#     created_at: datetime
#     updated_at: datetime
#     user_id: int

#     class Config:
#         orm_mode = True


# class UserBase(BaseModel):
#     name: str


# class UserCreate(UserBase):
#     pass


# class User(UserBase):
#     id: int
#     created_at: datetime
#     tasks: list[Task] = []

#     class Config:
#         orm_mode = True