# Style Guide
## ディレクトリ構成
### setting/
変数宣言、mixinなど
### base/
リセット・デフォルトスタイル定義
### block/
BEMのBlock
### utility/
helperなど
## CSS設計ルール
- block/内のクラス名は、BEMを用いる `.block__element--modifier`
 - modifierのパターンが多数存在する場合は、必要に応じて `.block__element--modifierKey_modifierValue` と表記する
- utility/内のクラス名は、scssのファイル名と同じプレフィックスを先頭に付ける【例】`.txt-bold`

