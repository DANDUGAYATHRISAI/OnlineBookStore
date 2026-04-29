import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container container--narrow" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go home</Link>
    </div>
  );
}
