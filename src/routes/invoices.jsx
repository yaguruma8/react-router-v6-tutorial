import {
  NavLink,
  Outlet,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { getInvoices } from '../data';

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
          ))}
      </nav>
      <Outlet />
    </div>
  );
}

function QueryNavLink({ to, ...props }) {
  const location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}
