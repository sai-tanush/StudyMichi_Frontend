import { useSelector } from 'react-redux';
import { RootState } from '../utils/store/store'; // Adjust the path if needed

const useCourse = () => {
  const { course } = useSelector((state: RootState) => state.course);

  return { course };
};

export default useCourse;
