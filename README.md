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
