import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/store/store';
import IconBtn from '../../../common/IconBtn';

const CartTotalAmount = () => {
  const { total } = useSelector((state: RootState) => state.cart);

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log('Courses in cart to be bought = ', courses);
  };

  return (
    <div>
      <p>Total:</p>
      <p>Rs {total}</p>

      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses={'w-full jusitfy-center'}
      />
    </div>
  );
};

export default CartTotalAmount;
