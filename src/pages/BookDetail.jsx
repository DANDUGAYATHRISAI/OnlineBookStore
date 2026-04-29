import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function BookDetail() {
  const { bookId } = useParams();
  const { getBook, dispatch, wishlist } = useStore();
  const book = getBook(bookId);

  if (!book) {
    return (
      <div className="container">
        <h1>Book not found</h1>
        <Link to="/books" className="link">← Back to catalog</Link>
      </div>
    );
  }

  const finalPrice = book.price * (1 - (book.discount || 0) / 100);
  const isWished = wishlist.includes(book.id);

  return (
    <div className="container">
      <Link to="/books" className="link">← Back to catalog</Link>
      <div className="detail">
        <div className="detail__cover">
          <img src={book.cover} alt={book.title} />
          {book.discount > 0 && <span className="book-card__discount">-{book.discount}%</span>}
        </div>
        <div className="detail__info">
          <span className="tag">{book.category}</span>
          <h1>{book.title}</h1>
          <p className="detail__author">by {book.author}</p>
          <p className="detail__rating">⭐ {book.rating} / 5</p>
          <p className="detail__desc">{book.description}</p>
          <div className="detail__price">
            {book.discount > 0 && (
              <span className="book-card__original">${book.price.toFixed(2)}</span>
            )}
            <span className="detail__final">${finalPrice.toFixed(2)}</span>
          </div>
          <div className="detail__actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => dispatch({ type: 'ADD_TO_CART', id: book.id })}
            >
              Add to Cart
            </button>
            <button
              className={`btn btn-outline ${isWished ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', id: book.id })}
            >
              {isWished ? '♥ In wishlist' : '♡ Add to wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
