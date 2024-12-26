import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../../services/operations/courseDetailsAPI';

const CourseDetails: React.FC = () => {
  const { courseId } = useParams();

  console.log('courseId in CourseDetails = ', courseId);

  const getCourseDetails = async () => {
    const result = await fetchCourseDetails(courseId);
    console.log('courseDetails = ', result);
  };

  useEffect(() => {
    getCourseDetails();
  });

  return (
    <div className="text-richblack-5">This is page for course Details</div>
  );
};

export default CourseDetails;
