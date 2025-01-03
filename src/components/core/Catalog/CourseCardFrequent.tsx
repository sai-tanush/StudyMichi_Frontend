import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/helperFunctions/avgRating';
import { CourseProps } from '../../../utils/slices/courseSlice';

interface CourseCardFrequentProps {
  course: CourseProps;
  height: string;
}

const CourseCardFrequent: React.FC<CourseCardFrequentProps> = ({
  course,
  height,
}) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReview);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div className="px-2 mx-2 my-5">
      <Link to={`/courses/${course._id}`}>
        <div>
          <div>
            <img
              src={course.thumbnail}
              alt="course Thumbnail"
              className={`${height} w-full lg:h-[300px] rounded-xl object-cover`}
            />
          </div>
          <div className="px-2 py-3">
            <p className="text-richblack-5 font-semibold">
              {course?.courseName}
            </p>
            {/* <p>{course?.instructor.firstName} {course?.instructor?.lastName}</p> */}
            <p className="text-sm text-richblue-100">- By Golden Eye</p>
            <div>
              <span className="text-richblack-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-5">
                {course?.ratingAndReview?.length} Ratings
              </span>
            </div>
            <p className="text-richblack-5">Rs.{course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCardFrequent;
