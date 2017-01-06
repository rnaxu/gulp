# gulp

## ディレクトリ構成
```
├── .eslintignore - eslint 除外ファイル一覧
├── .eslintrc - eslint 設定ファイル
├── .gitignore - git 除外ファイル一覧
├── .stylelintignore - stylelint 除外ファイル一覧
├── .stylelintrc - stylelint 設定ファイル
├── README.md - このドキュメント
├── aigis_config.yml - スタイルガイド設定ファイル
├── (dist) - ビルド済みディレクトリ
│   ├── css
│   ├── img
│   ├── *.html
│   └── js
├── gulpfile.js - タスクランナー設定ファイル
├── index.html - ページ一覧
├── package.json - パッケージ一覧
├── src - ビルド前ディレクトリ（作業ディレクトリ）
│   ├── css - CSS
│   │   ├── base - リセット、デフォルトスタイルを定義
│   │   ├── module - BEM の block 単位で切り分けられたモジュール
│   │   ├── setting - 変数、mixin
│   │   ├── style.css - 分割された CSS をここで import
│   │   └── utility - helper
│   ├── ejs - EJS（HTML）
│   │   ├── data - json 形式のテキストデータ
│   │   ├── pages - ページ本体
│   │   └── partials - 分割された HTML
│   ├── img - 画像
│   ├── js - JS
│   │   ├── lib - ライブラリ
│   │   ├── module - 機能ごとに切り分けられたモジュール
│   │   └── script.js - 分割された JS をここで import
│   └── sprite - css sprite の元画像
└── styleguide - スタイルガイド
    ├── aigis_assets
    │   └── css - スタイルガイド自体の CSS
    ├── (dist) - ビルド済みスタイルガイド
    └── template_ejs - スタイルガイドのテンプレート
```

## command
build
```
gulp
```

build & watch & launch local server
```
gulp serve
```

build css sprite
```
gulp sprite
```

compress images
```
gulp image
```

build styleguide
```
gulp guide
```