import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { CourseProps } from '../../../utils/slices/courseSlice';
import CourseCardFrequent from './CourseCardFrequent';

interface CourseSliderProps {
  courses: CourseProps[];
}

const CourseSlider: React.FC<CourseSliderProps> = ({ courses }) => {
  return (
    <div className="text-richblack-5">
      {courses?.length ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={50}
          pagination={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            1024: { slidesPerView: 3 },
          }}
        >
          {courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCardFrequent course={course} height={'h-[250]px'} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Course Found</p>
      )}
    </div>
  );
};

export default CourseSlider;
