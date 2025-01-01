import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../../services/operations/courseDetailsAPI';
import Spinner from '../common/Spinner';
import RatingStars from '../common/RatingStars';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { CiGlobe } from 'react-icons/ci';
import BuyCourseCard from '../core/Catalog/BuyCourseCard';

const CourseDetails: React.FC = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);

  console.log('courseId in CourseDetails = ', courseId);

  const getCourseDetails = async () => {
    setLoading(true);
    const result = await fetchCourseDetails(courseId);
    console.log('courseDetails = ', result);
    setLoading(false);
  };

  useEffect(() => {
    getCourseDetails();
  });

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex w-3/4 min-h-screen mx-auto gap-x-2 ">
      {/* About Course  */}
      <div className="flex flex-col  lg:w-[60%]">
        {/* Course Header */}
        <div className="flex flex-col gap-y-2 p-4 lg:mt-[10%]">
          <p className="text-4xl text-richblack-5 font-semibold">Course Name</p>
          <p className="text-lg text-richblack-300">Course Description</p>

          <div className="flex gap-x-2">
            <span className="text-richblack-100">reviewCount</span>
            <RatingStars Review_Count={4} />
            <span className="text-richblack-100">Ratings</span>
          </div>

          <div className="flex gap-x-4">
            <div className="flex items-center gap-x-2 text-md text-richblack-100">
              <IoInformationCircleOutline size={22} />
              <p>Created at Date</p>
            </div>

            <div className="flex items-center gap-x-2 text-md text-richblack-100">
              <CiGlobe size={22} />
              <p>English</p>
            </div>
          </div>
        </div>

        {/* Course Body */}
        <div className="flex flex-col gap-y-4 p-5">
          <div className="lg:h-[150px] flex flex-col justify-center gap-y-5 px-10 border border-richblack-600">
            <p className="text-3xl text-richblack-50 font-semibold">
              What you'll learn
            </p>
            <p className="text-lg text-richblack-50 ">
              Points to learn from course
            </p>
          </div>

          <div className="flex flex-col gap-y-4">
            <p className="text-3xl text-richblack-50 font-semibold">
              Course Content
            </p>
          </div>
        </div>
      </div>

      {/* Buy Course */}
      <div className="flex flex-col ">
        <BuyCourseCard />
      </div>
    </div>
  );
};

export default CourseDetails;
