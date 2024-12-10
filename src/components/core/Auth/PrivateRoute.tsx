import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/store/store';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token !== null) return children;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;
