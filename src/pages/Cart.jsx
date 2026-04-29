import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function Cart() {
  const { cartDetailed, cartTotal, dispatch } = useStore();

  if (cartDetailed.length === 0) {
    return (
      <div className="container">
        <h1>Your cart</h1>
        <p className="empty">Your cart is empty.</p>
        <Link to="/books" className="btn btn-primary">Browse books</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your cart</h1>
      <ul className="cart-list">
        {cartDetailed.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.cover} alt={item.title} className="cart-item__cover" />
            <div className="cart-item__info">
              <Link to={`/books/${item.id}`} className="cart-item__title">{item.title}</Link>
              <p className="cart-item__author">by {item.author}</p>
              <p>${item.finalPrice.toFixed(2)} each</p>
            </div>
            <div className="cart-item__qty">
              <button onClick={() => dispatch({ type: 'SET_QTY', id: item.id, qty: item.qty - 1 })}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => dispatch({ type: 'SET_QTY', id: item.id, qty: item.qty + 1 })}>+</button>
            </div>
            <div className="cart-item__total">${item.lineTotal.toFixed(2)}</div>
            <button
              className="btn btn-outline"
              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p>Total: <strong>${cartTotal.toFixed(2)}</strong></p>
        <Link to="/checkout" className="btn btn-primary btn-lg">Proceed to checkout</Link>
      </div>
    </div>
  );
}
