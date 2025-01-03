import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/store/store';
import CartCourses from './CartCourses';
import CartAmount from './CartTotalAmount';

const Cart = () => {
  const { total, totalItems } = useSelector((state: RootState) => state.cart);
  return (
    <div className="lg:w-[70%] ml-[10%]">
      <h1 className="mb-14 text-3xl font-semibold text-richblack-5">
        Your Cart
      </h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        Total {totalItems} courses in cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start justify-around gap-x-10 gap-y-6 lg:flex-row">
          <CartCourses />
          <CartAmount />
        </div>
      ) : (
        <p className="text-3xl font-semibold text-richblack-5">
          Your cart is empty
        </p>
      )}
    </div>
  );
};

export default Cart;
