import { setToken } from '../../utils/slices/authSlice';
import { resetCart } from '../../utils/slices/cartSlice';
import { setUser } from '../../utils/slices/profileSlice';
import { endpoints } from '../apis';
import { Dispatch } from 'redux';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../apisconnector'; // Assuming this is your apiConnector function
import { setLoading } from '../../utils/slices/authSlice';
import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../../utils/store/store';

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

type emailType = string;
type passwordType = string;

interface SignUpParams {
  accountType: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
  navigate: NavigateFunction;
}

// Assuming this is your setLoading action

// Define the types for the parameters
type EmailType = string;

// The sendOtp function with types
export function sendOtp(email: EmailType, navigate: NavigateFunction) {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: 'POST',
        url: SENDOTP_API,
        bodyData: {
          email,
          checkUserPresent: true,
        },
      });
      console.log('SENDOTP API RESPONSE............', response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('OTP Sent Successfully');
      navigate('/verify-email');
    } catch (error) {
      console.log('SENDOTP API ERROR............', error);
      toast.error('Could Not Send OTP');
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp({
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate,
}: SignUpParams) {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: 'POST',
        url: SIGNUP_API,
        bodyData: {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        },
      });

      console.log('SIGNUP API RESPONSE............', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success('Signup Successful');
      navigate('/login');
    } catch (error) {
      console.log('SIGNUP API ERROR............', error);
      toast.error('Signup Failed');
      navigate('/signup');
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(
  email: emailType,
  password: passwordType,
  navigate: NavigateFunction,
) {
  return async (dispatch: Dispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: 'POST',
        url: LOGIN_API,
        bodyData: {
          email,
          password,
        },
      });

      console.log('LOGIN API RESPONSE............', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Login Successful');
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard/my-profile');
    } catch (error) {
      console.log('LOGIN API ERROR............', error);
      toast.error('Login Failed');
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function getPasswordResetToken(
  email: emailType,
  setEmailSent: React.Dispatch<React.SetStateAction<boolean>>,
) {
  return async (dispatch: Dispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: 'POST',
        url: RESETPASSTOKEN_API,
        bodyData: {
          email,
        },
      });

      console.log('RESETPASSTOKEN RESPONSE............', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Reset Email Sent');
      setEmailSent(true);
    } catch (error) {
      console.log('RESETPASSTOKEN ERROR............', error);
      toast.error('Failed To Send Reset Email');
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function resetPassword(
  password: passwordType,
  confirmPassword: passwordType,
  token: string,
  navigate: NavigateFunction,
) {
  return async (dispatch: Dispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: 'POST',
        url: RESETPASSWORD_API,
        bodyData: {
          password,
          confirmPassword,
          token,
        },
      });

      console.log('RESETPASSWORD RESPONSE............', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Password Reset Successfully');
      navigate('/login');
    } catch (error) {
      console.log('RESETPASSWORD ERROR............', error);
      toast.error('Failed To Reset Password');
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function logout(navigate: NavigateFunction) {
  return (dispatch: Dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged Out');
    navigate('/');
  };
}
