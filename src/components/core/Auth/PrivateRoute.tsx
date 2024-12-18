// This component will ensure only authenticated users can access this route

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../../utils/store/store';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token !== null) return children;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;
