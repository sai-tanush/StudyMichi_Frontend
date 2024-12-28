import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/store/store';
import IconBtn from '../../../common/IconBtn';
import useAuth from '../../../../hooks/useAuth';
import useUserDetails from '../../../../hooks/useUserDetails';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';

const CartTotalAmount = () => {
  const { total, cart } = useSelector((state: RootState) => state.cart);
  const { token } = useAuth();
  const { user } = useUserDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    buyCourse(courses, token, user, navigate, dispatch);
    console.log('Courses in cart to be bought = ', courses);
  };

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>

      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses={'w-full jusitfy-center'}
      />
    </div>
  );
};

export default CartTotalAmount;
