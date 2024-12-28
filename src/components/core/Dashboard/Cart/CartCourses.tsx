import { useSelector } from 'react-redux';
import { GiNinjaStar } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../utils/slices/cartSlice';
import { RootState } from '../../../../utils/store/store';
import { CourseProps } from '../../../../utils/slices/courseSlice';

const CartCourses = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  console.log('cart Details = ', cart);

  return (
    <div className="w-[40%]">
      {cart.map((course: CourseProps, index: number) => (
        <div className="flex justify-between items-center border border-richblack-600 rounded-lg p-2 mb-6">
          <div key={index} className="flex items-center gap-4 p-4 border-b">
            {/* Course Thumbnail */}
            <img
              src={course?.thumbnail}
              alt={`${course?.courseName} thumbnail`}
              className="w-[250px] h-[150px] object-cover rounded-md"
            />

            {/* Course Details */}
            <div className="flex flex-col">
              {/* Course Name */}
              <p className="text-lg font-semibold text-richblack-5">
                {course?.courseName}
              </p>
              {/* Course Category */}
              <p className="text-sm text-gray-500 text-richblack-5">
                {course?.category?.name}
              </p>
              {/* Rating */}
              <div className="flex items-center mt-2">
                <span className="text-yellow-200 text-sm font-bold mr-2">
                  4.8
                </span>
                <ReactStars
                  count={5} // Total stars
                  size={20} // Size of each star
                  value={4}
                  edit={false} // Set to false to make the stars uneditable
                  activeColor="#ffd700" // Active star color (filled star)
                  emptyIcon={<GiNinjaStar />} // Icon for empty star
                  fullIcon={<GiNinjaStar />} // Icon for filled star
                />
                <span className="text-richblack-300 text-sm">
                  {course?.ratingAndReview?.length} Ratings
                </span>
              </div>
              <p className="text-caribbeangreen-50">Rs {course?.price} </p>
            </div>
          </div>

          <div className="text-red-100">
            <button onClick={() => dispatch(removeFromCart(course._id))}>
              <RiDeleteBin6Line size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCourses;
