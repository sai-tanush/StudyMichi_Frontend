import { useSelector } from 'react-redux';
import { RootState } from '../utils/store/store';

const useAuth = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  // Determine if the user is authenticated based on token existence
  const isAuthenticated = !!token;

  return { token, isAuthenticated };
};

export default useAuth;
