# アプリ名

都道府県別　総人口推移グラフ

# 内容

- 選択した都道府県の人口推移が折れ線グラフで表示される

# 技術スタック

- フロントエンド
  - React
  - Typescript
  - Recharts（グラフ化するライブラリ）
  - axios
- その他
  - Docker
  - Prettier
  - Eslint
  - sass
  - api → RESAS 地域経済分析システムの api を利用しています。

# 使い方

```
git clone https://github.com/KINE-M/population_transition.git
cd population_transition
```

app 配下の.env.sample をファイルをコピーし、.env ファイルを作成

.env ファイルは下記の内容になります。

```

REACT_APP_RESAS_ENDPOINT = 'https://opendata.resas-portal.go.jp'

REACT_APP_RESAS_API_KEY = '取得した API キー'

```

API キーが必須となります。
API キーの取得は下記アドレスとなります。

```
https://opendata.resas-portal.go.jp/
```

Docker イメージを作成し起動します。

```
docker compose up -d --build
```

- 下記アドレスにアクセス（docker compose の build 後起動するまでに少し時間がかかります。）

```

http://localhost:3000

```
