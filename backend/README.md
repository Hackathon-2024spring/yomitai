プロジェクトルート/
│
├── .devcontainer/
│   ├── Dockerfile            # DevContainerのためのDockerfile
│   └── devcontainer.json     # DevContainerの設定ファイル
│
├── docker-compose.yml        # 複数のコンテナを管理するためのDocker Compose設定ファイル
│
├── pyproject.toml            # Poetryの設定ファイル
│
├── poetry.lock               # Poetryのロックファイル（依存関係の正確なバージョンを記録）
│
├── .vscode/                  # VS Codeの設定ファイルを置くディレクトリ（必要に応じて）
│   └── settings.json         # VS Codeのプロジェクト固有の設定
│
├── app/                      # アプリケーションのソースコードを置くディレクトリ
│   ├── main.py               # FastAPIのエントリーポイント
│   └── ...                   # その他のアプリケーションファイル
│
└── README.md                 # プロジェクトのREADMEファイル