// This will prevent authenticated users from accessing this route
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import useAuth from '../../../hooks/useAuth';

interface OpenRouteProps {
  children: ReactNode;
}

const OpenRoute: React.FC<OpenRouteProps> = ({ children }) => {
  const { token } = useAuth();

  if (token === null) {
    return children;
  } else {
    return <Navigate to="/dashboard/my-profile" />;
  }
};

export default OpenRoute;
