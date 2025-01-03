import { useSelector } from 'react-redux';
import { RootState } from '../utils/store/store';

const useUserDetails = () => {
  const { user } = useSelector((state: RootState) => state.profile);

  return { user };
};

export default useUserDetails;
