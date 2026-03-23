# メンバー並び替えとロール表示の調整

ユーザーによって追加された新しい並び替えルール（ロール：UI/UX, フロントエンド, サーバサイド）が、UI上でも正しく反映（クラス適用とスタイリング）されるように調整します。

## 変更内容

### [components] (src/components)

#### [MODIFY] [GroupList.vue](file:///c:/Users/mauve/OneDrive/%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88/20_portfolio/group-tool/src/components/GroupList.vue)
- テンプレート内の `:class` 適用ロジックを、全てのロール名に対応できるように修正します。
- スタイルに `UI/UX`, `フロントエンド`, `サーバサイド` 用の配色を追加します。

### [data] (public/data/202604_6c_project)

#### [MODIFY] [members.json](file:///c:/Users/mauve/OneDrive/%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88/20_portfolio/group-tool/public/data/202604_6c_project/members.json)
- 動作確認のため、いくつかのメンバーに `リーダー`, `UI/UX` などのロールを割り当てます。

## 検証計画

- `DataSelector.vue` で `202604_6c_project` が選択されている状態で、メンバーが正しく並び替わっているか、およびタグに色が適用されているかを確認します。
