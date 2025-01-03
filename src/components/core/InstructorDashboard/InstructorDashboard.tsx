import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { getInstructorData } from '../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import useUserDetails from '../../../hooks/useUserDetails';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const InstructorDashboard = () => {
  const { token } = useAuth();
  const { user } = useUserDetails();
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);

      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      console.log('instructorApiData = ', instructorApiData);

      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }

      if (result) {
        setCourses(result);
      }

      setLoading(false);
    };
    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0,
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0,
  );

  return (
    <div className="text-white w-3/4 mx-auto">
      <div>
        <h1>Hi {user?.firstName}</h1>
        <p>Let's start something new</p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div>
            <div>
              <InstructorChart courses={instructorData} />
              <div>
                <p>Statistics</p>
                <div>
                  <p>Total Courses</p>
                  <p>{courses.length}</p>
                </div>

                <div>
                  <p>Total Students</p>
                  <p>{totalStudents}</p>
                </div>

                <div>
                  <p>Total Income</p>
                  <p>{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Render 3 courses */}
            <div>
              <p>Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p>View all</p>
              </Link>
            </div>
            <div>
              {courses.slice(0, 3).map((course) => (
                <div>
                  <img src={course.thumbnail} alt="course_thumbnail" />
                  <div>
                    <p>{course.courseName}</p>
                    <div>
                      <p>{course.studentEnrolled.length} students</p>
                      <p> | </p>
                      <p> Rs {course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You have not created any courses yet</p>
          <Link to={'/dashboard/addCourse'}>Create a Course</Link>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
