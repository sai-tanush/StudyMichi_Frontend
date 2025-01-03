import { FaShareFromSquare } from 'react-icons/fa6';
import { buyCourse } from '../../../services/operations/studentFeaturesAPI';
import useAuth from '../../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useUserDetails from '../../../hooks/useUserDetails';
import { ModalDataProps } from '../../common/ConfirmationModal';
import { CourseProps } from '../../../utils/slices/courseSlice';
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../utils/slices/cartSlice';

interface BuyCourseCardProps {
  setConfirmationModal: React.Dispatch<
    React.SetStateAction<ModalDataProps | null>
  >;
  courseData: CourseProps;
}

const BuyCourseCard: React.FC<BuyCourseCardProps> = ({
  setConfirmationModal,
  courseData,
}) => {
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
    setConfirmationModal({
      text1: 'You are not logged-in',
      text2: 'Please login to purchase the course',
      btn1Text: 'Login',
      btn2Text: 'Cancel',
      btn1Handler: () => navigate('/login'),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddtoCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an instructor, you can't buy the course");
      return;
    }

    if (token) {
      dispatch(addToCart(courseData));
      return;
    }
    setConfirmationModal({
      text1: 'You are not logged in',
      text2: 'Please login and add to cart',
      btn1Text: 'login',
      btn2Text: 'cancel',
      btn1Handler: () => navigate('/login'),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success('Link copied to Clipboard');
  };

  return (
    <div className="flex flex-col w-full bg-richblack-800 p-5 gap-y-4 rounded-lg lg:mt-[23%]">
      <img
        src={courseData?.thumbnail}
        alt="Course thumbnail"
        className="h-[250px] w-[380px] rounded-lg"
      />
      <p className="text-3xl text-richblack-5 font-semibold">
        Rs.{courseData?.price}
      </p>

      <button
        onClick={
          user && courseData?.studentEnrolled.includes(user?._id)
            ? () => navigate('/dashboard/enrolled-courses')
            : handleBuyCourse
        }
        className="text-center text-[16px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 shadow-sm shadow-richblack-300"
      >
        {user && courseData?.studentEnrolled.includes(user?._id)
          ? 'Go to Course'
          : 'Buy now'}
      </button>
      {!courseData?.studentEnrolled.includes(user?._id) && (
        <button
          onClick={handleAddtoCart}
          className="text-center text-[16px] px-6 py-3 rounded-md font-bold bg-richblack-800 text-white hover:scale-95 
            transition-all duration-200 shadow-sm shadow-richblack-600 border border-richblack-600"
        >
          Add to Cart
        </button>
      )}

      <p className="text-md text-richblack-100 text-center mt-2">
        30-Day Money-Back Guarantee
      </p>

      <p className="text-xl text-richblack-50 font-semibold">
        This Course Includes :
      </p>

      <div className="flex flex-col gap-y-1 ml-1">
        {JSON.parse(courseData?.instructions as unknown as string).map(
          (item: string, index: number) => (
            <p key={index} className="flex gap-2">
              <span className="text-lg font-semibold text-caribbeangreen-100">
                {item}
              </span>
            </p>
          ),
        )}
      </div>

      <div
        onClick={handleShare}
        className=" text-yellow-25 flex mx-auto gap-x-2 cursor-pointer"
      >
        <FaShareFromSquare size={22} />
        <p className="text-md">Share</p>
      </div>
    </div>
  );
};

export default BuyCourseCard;
