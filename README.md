# react-router-tutorial

## 公式
[react router tutorial](https://reactrouterdotcom.fly.dev/docs/en/v6/getting-started/tutorial)

## インストール
```shell
npm init vite@latest router-tutorial --template react
cd router-tuutorial
npm install
npm install react-router-dom@6
```

## URLの接続(Connect to URL)
```js
// src/App.jsx
export default function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
    </div>
  )
}
```
```js
// src/main.jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

## いくつかのリンクを追加(Add Some Links)
```js
// src/App.jsx
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to='/invoices'>Invoices</Link> |{' '}
        <Link to='/expenses'>Expenses</Link>
      </nav>
    </div>
  );
}
```
```js
// src/routes/expences.jsx
export default function Expenses() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Expenses</h2>
    </main>
  )
}
```
`src/routes/invoices.jsx`も同様に作成する

この時点ではURLは制御できるようになっているが表示はまだ

## いくつかのルーティングを追加(Add Some Routes)
```js
// src/main.jsx
import Expenses from './routes/expenses';
import Invoices from './routes/invoices';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//...
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='expenses' element={<Expenses />} />
        <Route path='invoices' element={<Invoices />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
```


## ルーティングのネスト(Nested Routes)
```js
//src/main.jsx

//...
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='expenses' element={<Expenses />} />
          <Route path='invoices' element={<Invoices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
```
`<Route>`同士はネスト可能

```js
// src/App.js
import { Link, Outlet } from 'react-router-dom';

// ...
  <nav
    style={{
      borderBottom: 'solid 1px',
      paddingBottom: '1rem',
    }}
  >
    <Link to='/invoices'>Invoices</Link> |{' '}
    <Link to='/expenses'>Expenses</Link>
  </nav>
  <Outlet />
```

ネストの親コンポーネントに`<Outlet />`を入れるとその位置にネストの子コンポーネントが表示される

## Invoicesのリスト(Listing the Invoices)

### データの作成

```js
// src/data.js
const invoices = [
  {
    name: "Santa Monica",
    number: 1995,
    amount: "$10,800",
    due: "12/05/1995",
  },
  // ...
];

export function getInvoices() {
  return invoices;
}
```

### データの読み込み

```js
// src/routes/invoices.jsx
import { getInvoices } from '../data';

export default function Invoices() {
  const invoices = getInvoices();

  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem',
        }}
      >
        {invoices.map((invoice) => (
          <Link
            style={{ display: 'block', margin: '1rem 0' }}
            to={`/invoicces/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
```

## "一致しない"ルーティングの追加(Adding a "No Match" Route)
```js
// src/main.js

// ...
  <Routes>
    <Route path='/' element={<App />}>
      <Route path='expenses' element={<Expenses />} />
      <Route path='invoices' element={<Invoices />} />
      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Route>
  </Routes>
```

`path='*'`は「他のルートが一致しない場合のみ一致する」特別なパス指定


## URLパラメータを読む(Reading URL Params)

### URLパラメータ用のルーティングを追加
```js
// src/main.js

// ...
  <Routes>
    <Route path='/' element={<App />}>
      <Route path='expenses' element={<Expenses />} />
      <Route path='invoices' element={<Invoices />}>
        <Route path=':invoiceId' element={<Invoice />} />
      </Route>
      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Route>
```

`path=':invoiceId'` でパスパラメータを指定する

### Outretの追加
```js
// src/routes/invoices.jsx
import { Link, Outlet } from 'react-router-dom';

// ...
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem',
        }}
      >
      {/* ... */}
      </nav>
      <Outlet />
    </div>
```

### URLパラメータを`useParams()`フックで読み取る
```js
// src/routes/invoice.jsx
import { useParams } from 'react-router-dom';

export default function Invoice() {
  const params = useParams();

  return <h2>Invoice: {params.invoiceId}</h2>;
}
```

`:invoiceId`を`useParams()`フックを用いて`params.invoiceId`として受け取る

### データを受け取る
```js
// src/data.js

// ...
export function getInvoice(num) {
  return invoices.find((invoice) => invoice.number === num);
}
```
```js
// src/routes/invoice.jsx
import { getInvoice } from '../data';

export default function Invoice() {
  const params = useParams();
  const invoice = getInvoice(parseInt(params.invoiceId, 10));
  return (
    <main style={{ padding: '1rem' }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name} : {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
    </main>
  );
}
```

## インデックスルート(Index Routes)
```js
// src/main.jsx

// ...
  <Routes>
    <Route path='/' element={<App />}>
      <Route path='expenses' element={<Expenses />} />
      <Route path='invoices' element={<Invoices />}>
        <Route
          index
          element={
            <main style={{ padding: "1rem"}}>
              <p>Select an invoice.</p>
            </main>
          }
          >
        </Route>
        <Route path=':invoiceId' element={<Invoice />} />
      </Route>
      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Route>
  </Routes>
```

インデックスルート`index`は親ルートに対するデフォルトのルートで、親ルートがマッチし、かつ子ルートがマッチしない時のみにマッチし、親ルートの`<Outret />`に描画される

この場合はインデックスルートは`/invoices/`で、`/invoices/:invoiceId`にマッチしない場合のみマッチする


## アクティブリンク(Active Links)

ナビゲーション用のリンク一覧の表示などで、現在のページへのリンクのスタイルを変更したい時に`Link`の代わりに`NavLink`を使って切り替えができる

```js
// src/routes/invoices.jsx
import { NavLink, Outlet } from 'react-router-dom';

// ...
  {invoices.map((invoice) => (
    <NavLink
      style={({ isActive }) => {
        return {
          display: 'block',
          margin: '1rem 0',
          color: isActive ? 'red' : 'black',
        };
      }}
      to={`/invoices/${invoice.number}`}
      key={invoice.number}
    >
      {invoice.name}
    </NavLink>
  ))}
```

`<Link>`を`<NavLink>`に変更する

`style`に渡すのをオブジェクト -> オブジェクトを返す関数（`isActive`の引数をとる）に変更する

### クラスを使う場合

`style`とほぼ同じ
```js
// Link
<Link className={{ color: 'red'}} />

// NavLink
<NavLink className={({isActive}) => isActive ? 'activeClass' : 'NotActiveClass'} />
```

## クエリパラメータ(Search Params)

`useSearchParams()`フックを使用する

```js
// src/routes/invoices.jsx
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';

export default function Invoices() {
  const invoices = getInvoices();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem',
        }}
      >
        <input
          value={searchParams.get('filter') || ''}
          onChange={(e) => {
            const filter = e.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />

        {invoices
          .filter((invoice) => {
            const filter = searchParams.get('filter');
            if (!filter) {
              return true;
            }
            const name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <NavLink
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : 'black',
                };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
```
`[searchParams, setSearchParams] = useSearchParams()`の形で用いる

- `input`に入力があるとき（例では`onChange`で補足されている）、`setSearchParams('filter')`により`invoices?filter=hoge`のようにURLが再レンダリングされ、`searchParams`に値がセットされる
- `invoices?filter=hoge`の値は`searchParams.get('filter')`で受け取る
  - `searchParams`は`URLSearchParams`オブジェクト
    - [URLSearchParams](https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams)

## カスタマイズ(Custom Befavior)

上のやり方だとinputでフィルター -> フィルターされたリンクをクリック でフィルターがクリアされてしまう（URLのクエリパラメータが消えてしまう）

残しておきたい場合、カスタムコンポーネントを作成する

```js
// src/routes/invoices.jsx
import {
  NavLink,
  Outlet,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

function QueryNavLink({ to, ...props }) {
  const location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Invoices() {
// ...
    <QueryNavLink
    style={({ isActive }) => {
      return {
        display: 'block',
        margin: '1rem 0',
        color: isActive ? 'red' : 'black',
      };
    }}
    to={`/invoices/${invoice.number}`}
    key={invoice.number}
  >
    {invoice.name}
  </QueryNavLink>
```
`useLocation()`フックで現在のパスなどを取得できる
```js
// useLocation()で返ってくるオブジェクト
{
    "pathname": "/invoices",
    "search": "?filter=s",
    "hash": "",
    "state": null,
    "key": "0lk9eztu"
}
```
`<NavLink to={to + location.search} {...props} />` で、クエリを付加したリンクが作成されて再レンダリングされる

### カスタマイズ例

```js
function BrandLink({ brand, ...props }) {
  // クエリパラメータを受け取る
  let [params] = useSearchParams();
  // クエリパラメータに?brand=<brand> が含まれているか調べる
  let isActive = params.getAll("brand").includes(brand);
  // 含まれていない場合
  if (!isActive) {
    // クエリパラメータに?brand=<brand>を追加
    params.append("brand", brand);
  } else {
    // ?brand=<brand>を削除した新しいURLSearchParamsを作成
    params = new URLSearchParams(
      Array.from(params).filter(
        ([key, value]) => key !== "brand" || value !== brand
      )
    );
  }
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}
```
`?brand=<brand>`の全てのリンクにスタイルをつける

リンクをクリックするたびに`isActive`が切り替わって、スタイルなし<->ありが切り替わる

というカスタムコンポーネント
