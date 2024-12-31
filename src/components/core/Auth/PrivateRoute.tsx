// This component will ensure only authenticated users can access this route

import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth();

  if (token !== null) return children;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;
