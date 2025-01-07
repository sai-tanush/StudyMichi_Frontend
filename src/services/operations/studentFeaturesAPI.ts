import toast from 'react-hot-toast';
import { studentEndpoints } from '../apis';
import { apiConnector } from '../apisconnector';
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
import rzpLogo from '../../assets/Logo/rzp_logo.png';
import { setPaymentLoading } from '../../utils/slices/courseSlice';
import { resetCart } from '../../utils/slices/cartSlice';
import { UserProps } from '../../utils/slices/profileSlice';
import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../../utils/store/store';

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

export interface RazorpayResponseProps {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayAndCourseResponseProps {
  courses: (string | undefined)[];
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

//the following line is equivalent to linking script tag in html
function loadScript(src: string) {
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
  courses: (string | undefined)[],
  token: string | null,
  userDetails: UserProps,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
) {
  const toastId = toast.loading('Loading...');

  try {
    //load the script
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js',
    );

    if (!res) {
      toast.error('Razorpay SDK failed to load');
      return;
    }
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
      handler: function (response: RazorpayResponseProps) {
        //send successfull mail
        console.log('response in buyCourse handler function = ', response);
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
    paymentObject.on('payment.failed', function () {
      toast.error('Oops, Payment Failed!');
    });
  } catch {
    toast.error('Could not make Payment');
  }
  toast.dismiss(toastId);
}

//send successful payment - email
async function sendPaymentSuccessfullEmail(
  response: RazorpayResponseProps,
  amount: number,
  token: string | null,
) {
  try {
    console.log('response in sendPaymentSuccessfullEmail = ', response);
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
  } catch {
    toast.error('Could not send email');
  }
}

//verify Payment
async function verifyPayment(
  bodyData: RazorpayAndCourseResponseProps,
  token: string | null,
  navigate: NavigateFunction,
  dispatch: AppDispatch,
) {
  console.log('bodyData in verifyPayment = ', bodyData);
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
  } catch {
    toast.error('Could not verify Payment');
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
