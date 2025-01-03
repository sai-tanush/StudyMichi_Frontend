import toast from 'react-hot-toast';
import { studentEndpoints } from '../apis';
import { apiConnector } from '../apisconnector';
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
import rzpLogo from '../../assets/Logo/rzp_logo.png';
import { setPaymentLoading } from '../../utils/slices/courseSlice';
import { resetCart } from '../../utils/slices/cartSlice';

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

//the following line is equivalent to linking script tag in html
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export async function buyCourse(
  courses,
  token,
  userDetails,
  navigate,
  dispatch,
) {
  const toastId = toast.loading('Loading...');
  console.log('token in buyCourse function = ', token);

  try {
    //load the script
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js',
    );

    if (!res) {
      toast.error('Razorpay SDK failed to load');
      return;
    }

    console.log('result from API in buyCourse = ', res);

    //initiate the order
    const orderResponse = await apiConnector({
      method: 'POST',
      url: COURSE_PAYMENT_API,
      bodyData: {
        courses,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('order Response = ', orderResponse);

    if (!orderResponse) {
      throw new Error(orderResponse.data.message);
    }

    //options
    const options = {
      key: RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: 'StudyMichi',
      description: 'Thank you for purchasing the course',
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        //send successfull mail
        sendPaymentSuccessfullEmail(
          response,
          orderResponse.data.data.amount,
          token,
        );

        //verifyPayment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on('payment.failed', function (response) {
      toast.error('Oops, Payment Failed!');
      console.log('Payment Failed', response.error);
    });
  } catch (error) {
    console.log('PAYMENT API ERROR....', error);
    toast.error('Could not make Payment');
  }
  toast.dismiss(toastId);
}

//send successful payment - email
async function sendPaymentSuccessfullEmail(response, amount, token) {
  console.log('response in sendPaymentSuccessfullEmail = ', response);
  try {
    await apiConnector({
      method: 'POST',
      url: SEND_PAYMENT_SUCCESS_EMAIL_API,
      bodyData: {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('PAYMENT SUCCESS EMAIL ERROR....', error);
  }
}

//verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading('Verifying Payment....');
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector({
      method: 'POST',
      url: COURSE_VERIFY_API,
      bodyData: {
        bodyData: bodyData,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success('Payment successful, you are added to the course');
    navigate('/dashboard/enrolled-courses');
    dispatch(resetCart());
  } catch (error) {
    console.log('PAYMENT VERIFY ERROR....', error);
    toast.error('Could not verify Payment');
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
