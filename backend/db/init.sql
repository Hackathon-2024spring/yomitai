-- initdb.sql

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
    name VARCHAR(255)
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    genre_id INT,
    title VARCHAR(255),
    author VARCHAR(255),
    publisher VARCHAR(255),
    total_page INT,
    isbn_code VARCHAR(20),
    image VARCHAR(255),
    created_at Datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE my_books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT NULL,
    genre_id INT NULL,
    title VARCHAR(255),
    author VARCHAR(255),
    publisher VARCHAR(255),
    total_page INT,
    image VARCHAR(255),
    start_date date,
    planned_end_date date,
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
    award_name VARCHAR(255),
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

INSERT INTO awards(award_name,created_at,updated_at)VALUES('連続読書日数３日','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('連続読書日数７日','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('連続読書日数１５日','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('連続読書日数３０日','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('連続読書日数１００日','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('連続読書日数３６５日','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書回数１回','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書回数１０回','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書回数１００回','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書ページ１００ページ','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書回数１０００ページ','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書回数５０００ページ','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書１冊','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書３冊','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書５冊','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書１０冊','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書２０冊','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書３０冊','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書４０冊','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書５０冊','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO awards(award_name,created_at,updated_at)VALUES('読書１００冊','2024-05-06 12:04:36','2024-05-06 12:04:36');


INSERT INTO users(user_name,password,email,created_at,updated_at)value('1111','$2b$12$al3GHbWL7Tu0pohp4WRxCeTaGkppYocjDp2gcOFhIkjq36Ww1quq.','1111','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO users(user_name,password,email,created_at,updated_at)value('2222','$2b$12$uEkmd2y2sZ/rzq1AW/Lcl.DaoSkKkSidJXu6qLnQW54HqZNXtd9WW','2222','2024-05-06 12:04:36','2024-05-06 12:04:36');
INSERT INTO users(user_name,password,email,created_at,updated_at)value('3333','$2b$12$NERZd7FRGKOtgdhfg.q7yugcUCWaWgC9I5UZPTkLol.fMtIvn8FP2','3333','2024-05-06 12:04:36','2024-05-06 12:04:36');


-- 権限設定の更新
FLUSH PRIVILEGES;