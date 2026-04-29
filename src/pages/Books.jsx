import { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { categories } from '../data/books.js';
import BookCard from '../components/BookCard.jsx';

export default function Books() {
  const { books } = useStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let list = books.filter((b) => {
      const matchQ = `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase());
      const matchC = category === 'All' || b.category === category;
      const matchP = b.price <= maxPrice;
      return matchQ && matchC && matchP;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [books, query, category, maxPrice, sort]);

  return (
    <div className="container">
      <h1>All Books</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title or author…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
        />
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <label className="filter-range">
          Max price: <strong>${maxPrice}</strong>
          <input
            type="range" min="5" max="100" step="1"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No books match your filters.</p>
      ) : (
        <div className="grid">
          {filtered.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      )}
    </div>
  );
}
