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

## fetchを使ったデータの取得と読み取り
```js
// invoices.jsx
import { useState, useEffect } from 'react';

export default function Invoices() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const users = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      ).then((res) => res.json());
      setUsers((prev) => users);
    })();
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem',
        }}
      >
        {users.map((user) => (
          <Link
            style={{ display: 'block', margin: '1rem 0' }}
            to={`/invoices/${user.id}`}
            key={user.id}
          >
            {user.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
```
`useEffect()`を使用して、URLにアクセス -> fetchで取得(async) -> stateにセット という流れ

第二引数に`[]`を指定することにより、URLにアクセスした初回のみ`useEffect()`に渡している関数の処理を走らせる

```js
// src/routes/invoice.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Invoice() {
  const { invoiceId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const u = await fetch(
        `https://jsonplaceholder.typicode.com/users/${invoiceId}`
      ).then((res) => res.json());
      setUser((prev) => u);
    })();
  }, [invoiceId]);

  return (
    <main style={{ padding: '1rem' }}>
      <h2>Username: {user.username}</h2>
      <p>email: {user.email}</p>
      <p>city: {user.address?.city}</p>
      <p>website: {user.website}</p>
    </main>
  );
}
```

`useEffect()`の第二引数に`invoiceId`を指定することにより、`invoiceId`に変更があった時のみ`useEffect()`を走らせる
