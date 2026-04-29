# Foliant — Online Book Store (React + Vite)

A complete frontend bookstore built with React, React Router, Context API, and plain CSS.
No backend — data persists in LocalStorage.

## Features
- Browse books with search, category, and price filters
- Book detail pages
- Cart with quantity management
- Wishlist
- Checkout (mock)
- Login / Register (mock, LocalStorage)
- Admin page to add/remove books
- Responsive design

## Run in VS Code

1. Open this folder in VS Code: `File → Open Folder`
2. Open the integrated terminal: `Ctrl+~` (or `Cmd+~` on Mac)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173

## Build for production
```bash
npm run build
npm run preview
```

## Folder Structure
```
foliant-bookstore/
├── index.html              ← HTML entry file
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            ← React entry
    ├── App.jsx             ← Router setup
    ├── components/         ← Header, Footer, BookCard, ProtectedRoute
    ├── context/            ← StoreContext (cart, wishlist, books, auth)
    ├── data/               ← books.js (sample JSON-style data)
    ├── pages/              ← Home, Books, BookDetail, Cart, Wishlist,
    │                          Checkout, Login, Admin, NotFound
    └── styles/             ← global.css + per-page CSS
```
