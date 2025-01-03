import { setToken } from '../../utils/slices/authSlice';
import { resetCart } from '../../utils/slices/cartSlice';
import { setUser } from '../../utils/slices/profileSlice';
import { endpoints } from '../apis';
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

type EmailType = string;

// The sendOtp function
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

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('OTP Sent Successfully');
      navigate('/verify-email');
    } catch (error) {
      toast.error('Could Not Send OTP');
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//signUp function
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

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success('Signup Successful');
      navigate('/login');
    } catch (error) {
      toast.error('Signup Failed');
      navigate('/signup');
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//login function
export function login(
  email: emailType,
  password: passwordType,
  navigate: NavigateFunction,
) {
  return async (dispatch: AppDispatch) => {
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
      toast.error('Login Failed');
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

//PasswordResetToken function
export function getPasswordResetToken(
  email: emailType,
  setEmailSent: React.Dispatch<React.SetStateAction<boolean>>,
) {
  return async (dispatch: AppDispatch) => {
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

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Reset Email Sent');
      setEmailSent(true);
    } catch (error) {
      toast.error('Failed To Send Reset Email');
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

//Reset Password function
export function resetPassword(
  password: passwordType,
  confirmPassword: passwordType,
  token: string,
  navigate: NavigateFunction,
) {
  return async (dispatch: AppDispatch) => {
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

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Password Reset Successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed To Reset Password');
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

//logout function
export function logout(navigate: NavigateFunction) {
  return (dispatch: AppDispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged Out');
    navigate('/');
  };
}
