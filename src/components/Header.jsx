import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function Header() {
  const { cartCount, wishlist, user, dispatch } = useStore();
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">📚 Foliant</Link>
        <nav className="header__nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/books" className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'active' : ''}>
            Wishlist <span className="badge">{wishlist.length}</span>
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
            Cart <span className="badge">{cartCount}</span>
          </NavLink>
          {user ? (
            <>
              <NavLink to="/admin">Admin</NavLink>
              <button className="link-btn" onClick={() => dispatch({ type: 'LOGOUT' })}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
