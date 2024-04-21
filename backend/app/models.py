from datetime import datetime

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Date, Text
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, unique=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    daily_log = relationship("Daily_log", back_populates="user")


class Daily_log(Base):
    __tablename__ = "daily_logs"

    id = Column(Integer, primary_key=True, index=True)
    page_read = Column(Integer)
    date = Column(Date)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer,ForeignKey("books.id"))

    user = relationship("User", back_populates="Daily_log")
    book = relationship("Book", back_populates="Daily_log")

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    author = Column(String, index=True, nullable=True)
    publisher = Column(String, index=True, nullable=True)
    total_page = Column(Integer, nullable=False)
    isbn_code = Column(String(20),nullable=True)
    image = Column(String,nullable=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

class Reading_session(Base):
    __tablename__ = "reading_sessions"

    id = Column(Integer, primary_key=True, index=True)
    start_date = Column(Date, index=True, nullable=False)
    planned_end_date = Column(Date, index=True, nullable=False)
    end_date = Column(Date, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    user = relationship("User", back_populates="Reading_session")
    book = relationship("Book", back_populates="Reading_session")



class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)


class Book_tag(Base):
    __tablename__ = "book_tags"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    user = relationship("User", back_populates="Book_tag")
    book = relationship("Book", back_populates="Book_tag")
    tag = relationship("Tag", back_populates="Book_tag")

class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)

class Book_genre(Base):
    __tablename__ = "book_genres"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    user = relationship("User", back_populates="Book_genre")
    book = relationship("Book", back_populates="Book_genre")
    genre = relationship("Genre", back_populates="Book_genre")

class Book_memo(Base):
    __tablename__ = "book_memos"

    id = Column(Integer, primary_key=True, index=True)
    memo = Column(Text, index=True,nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    user = relationship("User", back_populates="Book_memo")
    book = relationship("Book", back_populates="Book_memo")


class Award(Base):
    __tablename__ = "awards"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)


class User_award(Base):
    __tablename__ = "user_awards"

    id = Column(Integer, primary_key=True, index=True)
    award_date = Column(Date, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)

    user = relationship("User", back_populates="User_award")
    award = relationship("Award", back_populates="User_award")

class Award_criteria(Base):
    __tablename__ = "award_criteria"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, index=True, nullable=False)
    value = Column(Integer,nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    award = relationship("Award", back_populates="award_criteria")