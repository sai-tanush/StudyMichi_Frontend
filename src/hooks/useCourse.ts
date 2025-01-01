import { useSelector } from 'react-redux';
import { RootState } from '../utils/store/store';

const useCourse = () => {
  const { course } = useSelector((state: RootState) => state.course);

  return { course };
};

export default useCourse;
