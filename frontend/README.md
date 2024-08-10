# ハッカソン フロントエンド

## 開発環境構築の手順

1. `docker compose up -d`
2. `docker exec -it {コンテナ名} bash`
3. `cd app && npm i`
4. `npm run dev`

## npm run devを実行してviteが見つからないと怒られた場合
1. Viteがnode_modulesにあるか確認（npm list vite）
2. Viteをインストール（npm install vite --save-dev）
3. 依存関係が正しくインストールされていない場合があるので再度インストール（npm install）
4. npm run devを実行