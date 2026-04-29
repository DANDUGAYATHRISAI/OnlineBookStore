import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function BookCard({ book }) {
  const { dispatch, wishlist } = useStore();
  const isWished = wishlist.includes(book.id);
  const finalPrice = book.price * (1 - (book.discount || 0) / 100);

  return (
    <article className="book-card">
      <Link to={`/books/${book.id}`} className="book-card__cover-link">
        <img src={book.cover} alt={book.title} className="book-card__cover" loading="lazy" />
        {book.discount > 0 && <span className="book-card__discount">-{book.discount}%</span>}
      </Link>
      <div className="book-card__body">
        <Link to={`/books/${book.id}`} className="book-card__title">{book.title}</Link>
        <p className="book-card__author">by {book.author}</p>
        <p className="book-card__rating">⭐ {book.rating}</p>
        <div className="book-card__price">
          {book.discount > 0 && <span className="book-card__original">${book.price.toFixed(2)}</span>}
          <span className="book-card__final">${finalPrice.toFixed(2)}</span>
        </div>
        <div className="book-card__actions">
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: 'ADD_TO_CART', id: book.id })}
          >
            Add to Cart
          </button>
          <button
            className={`btn btn-icon ${isWished ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', id: book.id })}
            aria-label="Toggle wishlist"
            title={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWished ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  );
}
