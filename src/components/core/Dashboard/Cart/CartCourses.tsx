import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/store/store';
import { GiNinjaStar } from 'react-icons/gi';
import ReactStars from 'react-rating-stars-component';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../utils/slices/cartSlice';
import { useDispatch } from 'react-redux';

const CartCourses = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      {cart.map((course, index) => (
        <div>
          <div key={index} className="flex items-center gap-4 p-4 border-b">
            {/* Course Thumbnail */}
            <img
              src={course?.thumbnail}
              alt={`${course?.courseName} thumbnail`}
              className="w-20 h-20 object-cover rounded-md"
            />

            {/* Course Details */}
            <div className="flex flex-col">
              {/* Course Name */}
              <p className="text-lg font-semibold">{course?.courseName}</p>
              {/* Course Category */}
              <p className="text-sm text-gray-500">{course?.category?.name}</p>
              {/* Rating */}
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-sm font-bold mr-2">
                  4.8
                </span>
                <ReactStars
                  count={5} // Total stars
                  size={20} // Size of each star
                  edit={false} // Set to false to make the stars uneditable
                  activeColor="#ffd700" // Active star color (filled star)
                  emptyIcon={<GiNinjaStar />} // Icon for empty star
                  fullIcon={<GiNinjaStar />} // Icon for filled star
                />
                <span>{course?.ratingAndReviews?.length} Ratings</span>
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => dispatch(removeFromCart(course._id))}>
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p>Rs {course?.price} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCourses;
