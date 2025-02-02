/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Spinner from '../../common/Spinner';
import useAuth from '../../../hooks/useAuth';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';
import { CourseProps } from '../../../utils/slices/courseSlice';
import toast from 'react-hot-toast';

const EnrolledCourses: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState<CourseProps[]>([]);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch {
      toast.error('Unable to fetch Enrolled course ');
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="lg:w-[60%] ml-[10%]">
      <div className="text-4xl text-richblack-50 font-semibold">
        Enrolled Courses
      </div>
      {!enrolledCourses ? (
        <Spinner />
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          {/* Courses Card */}
          {enrolledCourses.map((course, index, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                index === arr.length - 1 ? 'rounded-b-lg' : 'rounded-none'
              }`}
              key={index}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`,
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_image"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>

              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>

              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
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
