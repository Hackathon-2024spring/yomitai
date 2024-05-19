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
COPY ./backend/pyproject.toml /workspace/
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

# ホストマシンのファイルをコピー
COPY . /workspace

# FastAPI の起動コマンド (オーバーライド可能)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]