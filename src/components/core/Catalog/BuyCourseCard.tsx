import { FaShareFromSquare } from 'react-icons/fa6';
import Thumbnail from '../../../assets/Images/aboutus1.webp';
import { buyCourse } from '../../../services/operations/studentFeaturesAPI';
import useAuth from '../../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useUserDetails from '../../../hooks/useUserDetails';

const BuyCourseCard: React.FC = () => {
  const { user } = useUserDetails();
  const { token } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const handleBuyCourse = () => {
    console.log('token in handleBuyCourse = ', token);
    if (token) {
      buyCourse([courseId], token, user, navigate, dispatch);
      return;
    }
  };

  const handleAddtoCart = () => {};

  return (
    <div className="flex flex-col w-full bg-richblack-800 p-5 gap-y-4 rounded-lg lg:mt-[23%]">
      <img
        src={Thumbnail}
        alt="Course thumbnail"
        className="h-[250px] w-[380px] rounded-lg"
      />
      <p className="text-4xl text-richblack-5 font-semibold">Rs. 699</p>

      <button
        onClick={handleBuyCourse}
        className="text-center text-[16px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300"
      >
        Buy now
      </button>
      <button
        onClick={handleAddtoCart}
        className="text-center text-[16px] px-6 py-3 rounded-md font-bold bg-richblack-800 text-white hover:scale-95 
        transition-all duration-200 shadow-sm shadow-richblack-600 border border-richblack-600"
      >
        Add to Cart
      </button>

      <p className="text-md text-richblack-100 text-center mt-2">
        30-Day Money-Back Guarantee
      </p>

      <p className="text-xl text-richblack-50 font-semibold">
        This Course Includes :{' '}
      </p>

      <div className=" text-yellow-25 flex mx-auto gap-x-4">
        <FaShareFromSquare size={22} />
        <p className="text-md">Share</p>
      </div>
    </div>
  );
};

export default BuyCourseCard;
