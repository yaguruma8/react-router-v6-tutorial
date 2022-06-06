import { Link, Outlet } from 'react-router-dom';
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
