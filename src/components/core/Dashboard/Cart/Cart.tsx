import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/store/store';
import CartCourses from './CartCourses';
import CartAmount from './CartTotalAmount';

const Cart = () => {
  const { total, totalItems } = useSelector((state: RootState) => state.cart);
  return (
    <div>
      <h1>Your Cart</h1>
      <p>{totalItems} courses in cart</p>

      {total > 0 ? (
        <div>
          <CartCourses />
          <CartAmount />
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
