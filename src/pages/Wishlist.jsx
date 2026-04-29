import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import BookCard from '../components/BookCard.jsx';

export default function Wishlist() {
  const { wishlist, books } = useStore();
  const items = books.filter((b) => wishlist.includes(b.id));

  if (items.length === 0) {
    return (
      <div className="container">
        <h1>Your wishlist</h1>
        <p className="empty">No books saved yet.</p>
        <Link to="/books" className="btn btn-primary">Browse books</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Your wishlist</h1>
      <div className="grid">
        {items.map((b) => <BookCard key={b.id} book={b} />)}
      </div>
    </div>
  );
}
