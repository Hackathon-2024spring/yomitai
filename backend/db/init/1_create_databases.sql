-- initdb.sql

-- データベースの作成
CREATE DATABASE IF NOT EXISTS yomitai;

-- ユーザーの作成
CREATE USER IF NOT EXISTS 'mysql'@'%' IDENTIFIED BY 'mysql';

-- 権限の付与
GRANT ALL PRIVILEGES ON yomitai.* TO 'mysql'@'%';

-- 権限設定の更新
FLUSH PRIVILEGES;