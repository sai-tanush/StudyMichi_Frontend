/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Spinner from '../../common/Spinner';
import useAuth from '../../../hooks/useAuth';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';

const EnrolledCourses: React.FC = () => {
  const { token } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log('Unable to fetch Enrolled course ', error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="text-richblack-5">
      <div>Enrolled Courses</div>
      {!enrolledCourses ? (
        <Spinner />
      ) : !enrolledCourses.length ? (
        <p>You have not enrolled in any course yet</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>

          {/* Courses Card */}
          {enrolledCourses.map((course, index) => (
            <div>
              <div>
                <img src={course.thumbnail} />
                <div>
                  <p>{course.courseName}</p>
                  <p>{course.courseDescription}</p>
                </div>
              </div>

              <div>{course?.totalDuration}</div>

              <div>
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
