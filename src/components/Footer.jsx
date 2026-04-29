export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Foliant Books — An independent online bookshop.</p>
        <p className="footer__sub">Built with React + Vite. Demo project.</p>
      </div>
    </footer>
  );
}
