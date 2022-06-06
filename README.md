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
