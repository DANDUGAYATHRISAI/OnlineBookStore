import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function Checkout() {
  const { cartDetailed, cartTotal, dispatch, user } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', address: '', city: '', card: '' });
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="container">
        <h1>🎉 Order placed!</h1>
        <p>Thanks {user.email} — a confirmation email is on its way (mock).</p>
        <button className="btn btn-primary" onClick={() => navigate('/books')}>Keep shopping</button>
      </div>
    );
  }

  if (cartDetailed.length === 0) {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <p className="empty">Your cart is empty.</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_CART' });
    setPlaced(true);
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <div className="checkout">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <label>Full name<input required className="input" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label>Address<input required className="input" value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })} /></label>
          <label>City<input required className="input" value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })} /></label>
          <label>Card number<input required className="input" placeholder="4242 4242 4242 4242"
            value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} /></label>
          <button type="submit" className="btn btn-primary btn-lg">Place order — ${cartTotal.toFixed(2)}</button>
        </form>
        <aside className="checkout__summary">
          <h3>Order summary</h3>
          <ul>
            {cartDetailed.map((i) => (
              <li key={i.id}>{i.title} × {i.qty} <span>${i.lineTotal.toFixed(2)}</span></li>
            ))}
          </ul>
          <p className="checkout__total">Total: <strong>${cartTotal.toFixed(2)}</strong></p>
        </aside>
      </div>
    </div>
  );
}
