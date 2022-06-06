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
