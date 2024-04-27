from datetime import datetime

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Date, Text
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

    daily_logs = relationship("Daily_log", backref="user")
    reading_sessions = relationship("Reading_session", backref="user")
    book_tags = relationship("Book_tag", backref="user")
    book_genres = relationship("Book_genre", backref="user")
    book_memos = relationship("Book_memo", backref="user")
    user_awards = relationship("User_award", backref="user")

class Daily_log(Base):
    __tablename__ = "daily_logs"

    id = Column(Integer, primary_key=True, index=True)
    page_read = Column(Integer)
    date = Column(Date)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))

    # user = relationship("User", backref="daily_logs")
    # book = relationship("Book", backref="daily_logs")

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    author = Column(String(255), nullable=True)
    publisher = Column(String(255), nullable=True)
    total_page = Column(Integer, nullable=False)
    isbn_code = Column(String(20),nullable=True)
    image = Column(String(255),nullable=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    daily_logs = relationship("Daily_log", backref="book") 
    reading_sessions = relationship("Reading_session", backref="book")
    book_tags = relationship("Book_tag", backref="book")
    book_genres = relationship("Book_genre", backref="book")
    book_memos = relationship("Book_memo", backref="book")

class Reading_session(Base):
    __tablename__ = "reading_sessions"

    id = Column(Integer, primary_key=True, index=True)
    start_date = Column(Date, nullable=False)
    planned_end_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))

    # user = relationship("User", backref="reading_sessions")
    # book = relationship("Book", backref="reading_sessions")



class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)

    book_tag = relationship("Book_tag", backref="tag")


class Book_tag(Base):
    __tablename__ = "book_tags"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    tag_id = Column(Integer, ForeignKey("tags.id"))

    # user = relationship("User", backref="book_tags")
    # book = relationship("Book", backref="book_tags")
    # tag = relationship("Tag", backref="book_tags")

class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)

    book_genre = relationship("Book_genre", backref="genre")

class Book_genre(Base):
    __tablename__ = "book_genres"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))
    genre_id = Column(Integer, ForeignKey("genres.id"))

    # user = relationship("User", backref="book_genres")
    # book = relationship("Book", backref="book_genres")
    # genre = relationship("Genre", backref="book_genres")

class Book_memo(Base):
    __tablename__ = "book_memos"

    id = Column(Integer, primary_key=True, index=True)
    memo = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    book_id = Column(Integer, ForeignKey("books.id"))

    # user = relationship("User", backref="book_memos")
    # book = relationship("Book", backref="book_memos")


class Award(Base):
    __tablename__ = "awards"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)

    user_award = relationship("User_award", backref="award")
    award_criteria = relationship("Award_criteria", backref="award")


class User_award(Base):
    __tablename__ = "user_awards"

    id = Column(Integer, primary_key=True, index=True)
    award_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    award_id = Column(Integer, ForeignKey("awards.id"))

    # user = relationship("User", backref="user_awards")
    # award = relationship("Award", backref="user_awards")

class Award_criteria(Base):
    __tablename__ = "award_criteria"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(255), nullable=False)
    value = Column(Integer,nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
    award_id = Column(Integer, ForeignKey("awards.id"))

    # award = relationship("Award", backref="award_criteria")