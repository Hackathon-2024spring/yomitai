from datetime import datetime,  date
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy import DateTime, Date, Text
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(255), unique=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)


class My_book(Base):
    __tablename__ = "my_books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=True)
    author = Column(String(255), nullable=True)
    publisher = Column(String(255), nullable=True)
    total_page = Column(Integer, nullable=True)
    image = Column(String(255), nullable=True)
    start_date = Column(Date, default=date.today(),nullable=False)
    planned_end_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    genre_id = Column(Integer, ForeignKey("genres.id"))

    user = relationship("User", backref="my_book")
    book = relationship("Book", backref="my_book")
    genre = relationship("Genre", backref="my_book")


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    author = Column(String(255), nullable=True)
    publisher = Column(String(255), nullable=True)
    total_page = Column(Integer, nullable=False)
    isbn_code = Column(Integer, nullable=True)
    image = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    genre_id = Column(Integer, ForeignKey("genres.id"))
    
    genre = relationship("Genre", backref="book")


class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)

class Daily_log(Base):
    __tablename__ = "daily_logs"

    id = Column(Integer, primary_key=True, index=True)
    page_read = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    memo = Column(Text)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    my_book_id = Column(Integer, ForeignKey("my_books.id"))

    my_book = relationship("My_book", backref="daily_log")

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    tag_name = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)


class Book_tag(Base):
    __tablename__ = "book_tags"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    my_book_id = Column(Integer, ForeignKey("my_books.id"))
    tag_id = Column(Integer, ForeignKey("tags.id"))

    my_book = relationship("My_book", backref="book_tag")
    tag = relationship("Tag", backref="book_tag")


class Award(Base):
    __tablename__ = "awards"

    id = Column(Integer, primary_key=True, index=True)
    award_type = Column(String(255), nullable=False)
    award_criteria = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)


class User_award(Base):
    __tablename__ = "user_awards"

    id = Column(Integer, primary_key=True, index=True)
    award_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    award_id = Column(Integer, ForeignKey("awards.id"))

    user = relationship("User", backref="user_award")
    award = relationship("Award", backref="user_award")
