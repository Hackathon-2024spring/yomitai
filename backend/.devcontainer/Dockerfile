# .devcontainer/Dockerfile
FROM python:3.9

# 環境変数を設定
ENV PYTHONUNBUFFERED 1

# Poetry をインストール
RUN pip install poetry
# 作業ディレクトリを設定
WORKDIR /workspace

# 依存関係をインストール
COPY pyproject.toml poetry.lock* /workspace/
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi

# ホストマシンのファイルをコピー
COPY . /workspace

# FastAPI の起動コマンド (オーバーライド可能)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]