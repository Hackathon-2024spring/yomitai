# .devcontainer/Dockerfile
FROM python:3.9

# 環境変数を設定
ENV PYTHONUNBUFFERED 1

# cronと必要なパッケージをインストール
RUN apt-get update && apt-get install -y cron \
  && pip install poetry sqlalchemy pymysql alembic mysqlclient passlib

# 作業ディレクトリを設定
WORKDIR /workspace

# 依存関係をインストール
COPY pyproject.toml poetry.lock* /workspace/
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

# ホストマシンのファイルをコピー
COPY . /workspace

# crontab ファイルとentrypoint.shをコンテナにコピー
COPY crontab /etc/cron.d/my_crontab
COPY entrypoint.sh /entrypoint.sh

# crontab ファイルとentrypoint.shの権限設定
RUN chmod 0644 /etc/cron.d/my_crontab \
  && chmod +x /entrypoint.sh

# エントリーポイントの設定
ENTRYPOINT ["/entrypoint.sh"]