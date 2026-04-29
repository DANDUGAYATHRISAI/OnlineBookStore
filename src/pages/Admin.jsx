import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function Admin() {
  const { books, dispatch } = useStore();
  const [form, setForm] = useState({
    title: '', author: '', category: 'Fiction', price: '', discount: 0, cover: '',
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.price) return;
    const id = 'b' + Date.now();
    dispatch({
      type: 'ADD_BOOK',
      book: {
        id,
        title: form.title,
        author: form.author,
        category: form.category,
        price: Number(form.price),
        discount: Number(form.discount) || 0,
        rating: 4.0,
        cover: form.cover || `https://picsum.photos/seed/${id}/400/600`,
        description: 'Newly added book.',
      },
    });
    setForm({ title: '', author: '', category: 'Fiction', price: '', discount: 0, cover: '' });
  };

  return (
    <div className="container">
      <h1>Admin — manage books</h1>

      <form className="auth-form" onSubmit={handleAdd}>
        <label>Title<input className="input" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label>Author<input className="input" value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })} /></label>
        <label>Category
          <select className="input" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Fiction</option><option>Non-Fiction</option>
            <option>Academic</option><option>Children</option>
          </select>
        </label>
        <label>Price (USD)<input className="input" type="number" step="0.01" value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })} /></label>
        <label>Discount %<input className="input" type="number" value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })} /></label>
        <label>Cover URL (optional)<input className="input" value={form.cover}
          onChange={(e) => setForm({ ...form, cover: e.target.value })} /></label>
        <button type="submit" className="btn btn-primary">Add book</button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>Existing books ({books.length})</h2>
      <table className="admin-table">
        <thead>
          <tr><th>Title</th><th>Author</th><th>Category</th><th>Price</th><th></th></tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td><td>{b.author}</td><td>{b.category}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
                <button className="btn btn-outline"
                  onClick={() => dispatch({ type: 'REMOVE_BOOK', id: b.id })}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
