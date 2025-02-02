import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import ReactStars from 'react-rating-stars-component';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';
import { apiConnector } from '../../services/apisconnector';
import { ratingsEndpoints } from '../../services/apis';

interface ReviewProps {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
  };
  rating: number;
  review: string;
  course: {
    _id: string;
    courseName: string;
  };
  __v: number;
}

const ReviewSlider: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector({
        method: 'GET',
        url: ratingsEndpoints.REVIEWS_DETAILS_API,
      });

      if (response?.data?.success) {
        setReviews(response?.data?.data);
      }
    };

    fetchAllReviews();
  }, []);

  return (
    <div>
      <div className="h-[200px] max-w-maxContent text-richblack-5 -mb-20 lg:-mb-0">
        <Swiper
          slidesPerView={2}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide
              key={index}
              className="lg:w-[20%] bg-richblack-700 py-2 px-8 mt-3"
            >
              <div className="flex gap-x-4 items-center">
                <img
                  src={
                    review?.user?.image
                      ? review?.user?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt="Profile_picture"
                  className="h-9 w-9 object-cover rounded-full"
                />
                <p className="text-richblack-5">
                  {review?.user?.firstName} {review?.user?.lastName}
                </p>
              </div>

              <div className="flex flex-col text-left mt-2">
                <p className="text-richblack-100">
                  {review?.course?.courseName}
                </p>
                <p className="text-richblack-300">{review?.review}</p>
              </div>

              <div className="flex gap-x-4 items-center mt-1">
                <ReactStars
                  count={5}
                  value={review?.rating}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <p>{review?.rating.toFixed(1)}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
