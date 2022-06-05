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

## React Router の設定
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

