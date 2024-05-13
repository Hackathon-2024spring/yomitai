#!/bin/sh

# cronサービスをバックグラウンドで起動
cron

# FastAPIアプリケーションを起動
uvicorn main:app --host 0.0.0.0 --reload