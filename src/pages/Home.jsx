import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import BookCard from '../components/BookCard.jsx';

export default function Home() {
  const { books } = useStore();
  const featured = books.slice(0, 4);
  return (
    <div className="container">
      <section className="hero">
        <div className="hero__text">
          <h1>Discover your next favourite read.</h1>
          <p>Hand-picked fiction, non-fiction, academic and children's books — delivered to your door.</p>
          <Link to="/books" className="btn btn-primary btn-lg">Browse the catalog →</Link>
        </div>
        <div className="hero__image" aria-hidden="true">📖</div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Featured Books</h2>
          <Link to="/books" className="link">View all</Link>
        </div>
        <div className="grid">
          {featured.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </section>
    </div>
  );
}
