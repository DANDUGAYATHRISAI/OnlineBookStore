import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

// Mock auth — just stores the email in context/LocalStorage.
export default function Login() {
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch({ type: 'LOGIN', email });
    const from = location.state?.from || '/';
    navigate(from, { replace: true });
  };

  return (
    <div className="container container--narrow">
      <h1>{mode === 'login' ? 'Login' : 'Create account'}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email<input type="email" required className="input" value={email}
          onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" required className="input" value={password}
          onChange={(e) => setPassword(e.target.value)} /></label>
        <button type="submit" className="btn btn-primary btn-lg">
          {mode === 'login' ? 'Login' : 'Sign up'}
        </button>
      </form>
      <p>
        {mode === 'login' ? "Don't have an account?" : 'Already have one?'}{' '}
        <button className="link-btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}
