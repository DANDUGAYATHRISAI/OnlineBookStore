import { createContext, useContext, useEffect, useReducer } from 'react';
import seedBooks from '../data/books.js';

// ---------- LocalStorage helpers ----------
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

// ---------- Initial state ----------
const initialState = {
  books: load('foliant.books', seedBooks),
  cart: load('foliant.cart', []),       // [{ id, qty }]
  wishlist: load('foliant.wishlist', []),// [id]
  user: load('foliant.user', null),     // { email } or null
};

// ---------- Reducer ----------
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find((c) => c.id === action.id);
      const cart = existing
        ? state.cart.map((c) => (c.id === action.id ? { ...c, qty: c.qty + 1 } : c))
        : [...state.cart, { id: action.id, qty: 1 }];
      return { ...state, cart };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((c) => c.id !== action.id) };
    case 'SET_QTY':
      return {
        ...state,
        cart: state.cart
          .map((c) => (c.id === action.id ? { ...c, qty: Math.max(1, action.qty) } : c)),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST': {
      const has = state.wishlist.includes(action.id);
      const wishlist = has
        ? state.wishlist.filter((id) => id !== action.id)
        : [...state.wishlist, action.id];
      return { ...state, wishlist };
    }
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.book] };
    case 'REMOVE_BOOK':
      return { ...state, books: state.books.filter((b) => b.id !== action.id) };
    case 'LOGIN':
      return { ...state, user: { email: action.email } };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist any state change to LocalStorage
  useEffect(() => save('foliant.books', state.books), [state.books]);
  useEffect(() => save('foliant.cart', state.cart), [state.cart]);
  useEffect(() => save('foliant.wishlist', state.wishlist), [state.wishlist]);
  useEffect(() => save('foliant.user', state.user), [state.user]);

  // ---------- Derived helpers ----------
  const getBook = (id) => state.books.find((b) => b.id === id);
  const cartDetailed = state.cart
    .map((c) => {
      const b = getBook(c.id);
      if (!b) return null;
      const finalPrice = b.price * (1 - (b.discount || 0) / 100);
      return { ...b, qty: c.qty, finalPrice, lineTotal: finalPrice * c.qty };
    })
    .filter(Boolean);
  const cartTotal = cartDetailed.reduce((sum, x) => sum + x.lineTotal, 0);
  const cartCount = state.cart.reduce((sum, x) => sum + x.qty, 0);

  const value = {
    ...state,
    dispatch,
    getBook,
    cartDetailed,
    cartTotal,
    cartCount,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// Custom hook for easy consumption
export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
