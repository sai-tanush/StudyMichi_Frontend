import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/store/store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import IconBtn from '../../../common/IconBtn';
import { IoIosAdd } from 'react-icons/io';
import CourseTable from './CourseTable';

const MyCourses: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <div className="flex justify-around ">
        <h1 className="text-richblack-5 text-4xl font-semibold ">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate('/dashboard/add-course')}
        >
          <IoIosAdd size={22} />
        </IconBtn>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;
