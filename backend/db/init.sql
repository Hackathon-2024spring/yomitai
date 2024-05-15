#!/bin/bash

-- データベースの作成
CREATE DATABASE IF NOT EXISTS yomitai;

-- ユーザーの作成
CREATE USER IF NOT EXISTS 'mysql'@'%' IDENTIFIED BY 'mysql';

-- 権限の付与
GRANT ALL PRIVILEGES ON yomitai.* TO 'mysql'@'%';


USE yomitai;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at Datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    genre_id INT,
    title VARCHAR(255),
    author VARCHAR(255),
    publisher VARCHAR(255),
    total_page INT,
    isbn_code INT,
    image VARCHAR(255),
    created_at Datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE my_books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NULL,
    genre_id INT NULL,
    title VARCHAR(255) NULL,
    author VARCHAR(255) NULL,
    publisher VARCHAR(255) NULL,
    total_page INT NULL,
    image VARCHAR(255) NULL,
    start_date date NOT NULL,
    planned_end_date date NOT NULL,
    end_date date NULL,
    created_at Datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE daily_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    my_book_id INT,
    page_read INT,
    date DATE,
    memo TEXT NULL,
    created_at Datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (my_book_id) REFERENCES my_books(id)
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255),
    created_at Datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE book_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    my_book_id INT,
    tag_id INT,
    created_at Datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (my_book_id) REFERENCES my_books(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

CREATE TABLE awards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    award_type VARCHAR(255),
    award_criteria INT,
    created_at Datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_awards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    award_id INT,
    award_date DATE,
    created_at Datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (award_id) REFERENCES awards(id)
);

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_id_value VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


INSERT INTO genres(name)VALUES('総記');
INSERT INTO genres(name)VALUES('百科事典');
INSERT INTO genres(name)VALUES('年鑑・雑誌');
INSERT INTO genres(name)VALUES('情報科学');

INSERT INTO genres(name)VALUES('哲学');
INSERT INTO genres(name)VALUES('心理（学）');
INSERT INTO genres(name)VALUES('倫理（学）');
INSERT INTO genres(name)VALUES('宗教');
INSERT INTO genres(name)VALUES('仏教');
INSERT INTO genres(name)VALUES('キリスト教');

INSERT INTO genres(name)VALUES('歴史総記');
INSERT INTO genres(name)VALUES('日本歴史');
INSERT INTO genres(name)VALUES('外国歴史');
INSERT INTO genres(name)VALUES('伝記・系譜');
INSERT INTO genres(name)VALUES('地理');
INSERT INTO genres(name)VALUES('旅行');

INSERT INTO genres(name)VALUES('社会科学総記');
INSERT INTO genres(name)VALUES('政治（国防・軍事含む）');
INSERT INTO genres(name)VALUES('法律');
INSERT INTO genres(name)VALUES('経済、財政、統計');
INSERT INTO genres(name)VALUES('経営');
INSERT INTO genres(name)VALUES('社会');
INSERT INTO genres(name)VALUES('教育');
INSERT INTO genres(name)VALUES('民族・風習');

INSERT INTO genres(name)VALUES('自然科学総記');
INSERT INTO genres(name)VALUES('数学');
INSERT INTO genres(name)VALUES('物理学');
INSERT INTO genres(name)VALUES('化学');
INSERT INTO genres(name)VALUES('天文・地学');
INSERT INTO genres(name)VALUES('生物学');
INSERT INTO genres(name)VALUES('医学・歯学・薬学');

INSERT INTO genres(name)VALUES('工学・工業総記');
INSERT INTO genres(name)VALUES('土木');
INSERT INTO genres(name)VALUES('建築');
INSERT INTO genres(name)VALUES('機械');
INSERT INTO genres(name)VALUES('電気');
INSERT INTO genres(name)VALUES('電子通信');
INSERT INTO genres(name)VALUES('海事・兵器');
INSERT INTO genres(name)VALUES('採鉱・治金');
INSERT INTO genres(name)VALUES('その他の工業');

INSERT INTO genres(name)VALUES('産業総記');
INSERT INTO genres(name)VALUES('農林業');
INSERT INTO genres(name)VALUES('水産業');
INSERT INTO genres(name)VALUES('商業');
INSERT INTO genres(name)VALUES('交通・通信');

INSERT INTO genres(name)VALUES('芸術総記');
INSERT INTO genres(name)VALUES('絵画・彫刻');
INSERT INTO genres(name)VALUES('写真・工芸');
INSERT INTO genres(name)VALUES('音楽・舞踊');
INSERT INTO genres(name)VALUES('演劇・映画');
INSERT INTO genres(name)VALUES('体育・スポーツ');
INSERT INTO genres(name)VALUES('諸芸・娯楽');
INSERT INTO genres(name)VALUES('家事');
INSERT INTO genres(name)VALUES('生活');
INSERT INTO genres(name)VALUES('コミックス・劇画');

INSERT INTO genres(name)VALUES('語学総記');
INSERT INTO genres(name)VALUES('日本語');
INSERT INTO genres(name)VALUES('英（米）語');
INSERT INTO genres(name)VALUES('ドイツ語');
INSERT INTO genres(name)VALUES('フランス語');
INSERT INTO genres(name)VALUES('各国語');

INSERT INTO genres(name)VALUES('文学総記');
INSERT INTO genres(name)VALUES('日本文学総記');
INSERT INTO genres(name)VALUES('日本文学詩歌');
INSERT INTO genres(name)VALUES('日本文学小説・物語');
INSERT INTO genres(name)VALUES('日本文学評論・随筆・その他');
INSERT INTO genres(name)VALUES('外国文学小説');
INSERT INTO genres(name)VALUES('外国文学その他');

INSERT INTO awards(award_type,award_criteria)VALUES('days',3);
INSERT INTO awards(award_type,award_criteria)VALUES('days',7);
INSERT INTO awards(award_type,award_criteria)VALUES('days',15);
INSERT INTO awards(award_type,award_criteria)VALUES('days',30);
INSERT INTO awards(award_type,award_criteria)VALUES('days',180);
INSERT INTO awards(award_type,award_criteria)VALUES('days',365);
INSERT INTO awards(award_type,award_criteria)VALUES('times',1);
INSERT INTO awards(award_type,award_criteria)VALUES('times',5);
INSERT INTO awards(award_type,award_criteria)VALUES('times',10);
INSERT INTO awards(award_type,award_criteria)VALUES('times',100);
INSERT INTO awards(award_type,award_criteria)VALUES('pages',100);
INSERT INTO awards(award_type,award_criteria)VALUES('pages',1000);
INSERT INTO awards(award_type,award_criteria)VALUES('pages',5000);
INSERT INTO awards(award_type,award_criteria)VALUES('books',1);
INSERT INTO awards(award_type,award_criteria)VALUES('books',3);
INSERT INTO awards(award_type,award_criteria)VALUES('books',5);
INSERT INTO awards(award_type,award_criteria)VALUES('books',10);
INSERT INTO awards(award_type,award_criteria)VALUES('books',20);
INSERT INTO awards(award_type,award_criteria)VALUES('books',30);
INSERT INTO awards(award_type,award_criteria)VALUES('books',50);
INSERT INTO awards(award_type,award_criteria)VALUES('books',100);


INSERT INTO users(user_name,password,email,created_at,updated_at)value('1111','$2b$12$al3GHbWL7Tu0pohp4WRxCeTaGkppYocjDp2gcOFhIkjq36Ww1quq.','1111','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO users(user_name,password,email,created_at,updated_at)value('2222','$2b$12$uEkmd2y2sZ/rzq1AW/Lcl.DaoSkKkSidJXu6qLnQW54HqZNXtd9WW','2222','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO users(user_name,password,email,created_at,updated_at)value('3333','$2b$12$NERZd7FRGKOtgdhfg.q7yugcUCWaWgC9I5UZPTkLol.fMtIvn8FP2','3333','2024-05-06 12:04:36','2024-05-06 12:04:36');

INSERT INTO books(genre_id,title,author,publisher, total_page, isbn_code, image, created_at,updated_at)value(10,'テスト用データ','著者','出版社',600,1234556789,'null','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO my_books(user_id, book_id,genre_id,title,author,publisher, total_page, start_date, planned_end_date)value(2,1,13,'テスト用データ2','著者','出版社',600,'2024-05-01','2024-05-20');
INSERT INTO my_books(user_id, genre_id,title,author,publisher, total_page, start_date, planned_end_date)value(2,13,'テスト用データ3','著者','出版社',347,'2024-05-03','2024-05-30');
INSERT INTO my_books(user_id, genre_id,title,author,publisher, total_page, start_date, planned_end_date)value(2,18,'テスト用データ4','著者','出版社',545,'2024-05-03','2024-05-30');
INSERT INTO my_books(user_id, genre_id,title,author,publisher, total_page, start_date, planned_end_date)value(3,19,'テスト用データ5','著者','出版社',229,'2024-05-03','2024-05-30');
INSERT INTO my_books(user_id, genre_id,title,author,publisher, total_page, start_date, planned_end_date)value(2,22,'テスト用データ6','著者','出版社',482,'2024-05-03','2024-05-30');

INSERT INTO tags(tag_name)value('試験用タグ');
INSERT INTO tags(tag_name)value('試験用タグ2');
INSERT INTO tags(tag_name)value('試験用タグ3');
INSERT INTO book_tags(my_book_id, tag_id)value(1,1);
INSERT INTO book_tags(my_book_id, tag_id)value(1,3);
INSERT INTO daily_logs(my_book_id,page_read,date,memo)value(1,40,'2024-05-10','2024-05-10: 読書１回目');
INSERT INTO daily_logs(my_book_id,page_read,date,memo)value(1,30,'2024-05-10','2024-05-10: 読書２回目');
INSERT INTO daily_logs(my_book_id,page_read,date,memo)value(1,20,'2024-05-11','2024-05-11: 読書３回目');
INSERT INTO daily_logs(my_book_id,page_read,date,memo)value(2,50,'2024-05-12','2024-05-12: 読書４回目');
INSERT INTO daily_logs(my_book_id,page_read,date,memo)value(3,80,'2024-05-13','2024-05-13: 読書５回目');
INSERT INTO daily_logs(my_book_id,page_read,date,memo)value(2,140,'2024-05-13','2024-05-13: 読書６回目');
INSERT INTO daily_logs(my_book_id,page_read,date,memo)value(3,149,'2024-05-14','2024-05-14: 読書７回目');

INSERT INTO user_awards(user_id,award_id,award_date)value(2,1,'2024-01-10');
INSERT INTO user_awards(user_id,award_id,award_date)value(2,2,'2024-01-20');
INSERT INTO user_awards(user_id,award_id,award_date)value(2,3,'2024-03-12');
INSERT INTO user_awards(user_id,award_id,award_date)value(2,7,'2024-01-10');
INSERT INTO user_awards(user_id,award_id,award_date)value(2,8,'2024-01-30');
INSERT INTO user_awards(user_id,award_id,award_date)value(2,9,'2024-02-20');
INSERT INTO user_awards(user_id,award_id,award_date)value(2,10,'2024-03-10');
INSERT INTO user_awards(user_id,award_id,award_date)value(2,11,'2024-05-10');

-- 権限設定の更新
FLUSH PRIVILEGES;