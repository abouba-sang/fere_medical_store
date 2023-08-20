import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const ProtectedRoute = () => {
  const { auth: { user } } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }

  return (
    <Outlet />
  );
}

export default ProtectedRoute;