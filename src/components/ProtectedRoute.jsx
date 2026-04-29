import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

// Simple gate — redirects to /login if no user is in context.
export default function ProtectedRoute({ children }) {
  const { user } = useStore();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
