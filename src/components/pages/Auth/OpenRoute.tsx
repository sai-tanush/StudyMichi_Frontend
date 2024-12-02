// This will prevent authenticated users from accessing this route
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../../utils/store/store';
import { ReactNode } from 'react';

interface OpenRouteProps {
  children: ReactNode;
}

const OpenRoute: React.FC<OpenRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token === null) {
    return children;
  } else {
    return <Navigate to="/dashboard/my-profile" />;
  }
};

export default OpenRoute;
