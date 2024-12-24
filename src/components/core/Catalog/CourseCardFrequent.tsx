import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
import { useEffect, useState } from 'react';
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
    <div className="text-richblack-5">
      <Link to={`/courses/${course._id}`}>
        <div>
          <div>
            <img
              src={course.thumbnail}
              alt="course Thumbnail"
              className={`${height} w-full rounded-xl object-cover`}
            />
          </div>
          <div>
            <p>{course?.courseName}</p>
            {/* <p>{course?.instructor.firstName} {course?.instructor?.lastName}</p> */}
            <div>
              <span>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span>{course?.ratingAndReview?.length} Ratings</span>
            </div>
            <p>{course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCardFrequent;
