/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddCourseStepForm from '../AddCourse/AddCourseStepForm';
import Spinner from '../../../common/Spinner';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../utils/slices/courseSlice';
import useCourse from '../../../../hooks/useCourse';
import useAuth from '../../../../hooks/useAuth';

const EditCourse: React.FC = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useCourse();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      console.log('Result in populateCourseDetails in EditCourse = ', result);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    };
    populateCourseDetails();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl text-richblack-5 font-semibold">Edit Course</h1>
      <div className="w-[50%] lg:ml-[15%]">
        {course ? (
          <AddCourseStepForm />
        ) : (
          <p className="text-lg text-richblack-5">Course not found</p>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
