import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store/store';
import Spinner from '../common/Spinner';
import OTPInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { sendOtp, signUp } from '../../services/operations/authAPI';
import '../../index.css';
import { GiBackwardTime } from 'react-icons/gi';

const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state: RootState) => state.auth);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!signupData) {
      navigate('/signup');
    }
  }, []);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData!;
    dispatch(
      signUp({
        accountType: accountType,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        otp: otp,
        navigate: navigate,
      }),
    );
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-1/4 mt-[-100px]">
        <h1 className="text-richblack-5 text-3xl font-semibold mb-3">
          Verify email
        </h1>
        <p className="text-richblack-100 text-lg">
          A verification code has been set to you. Enter the code below
        </p>
        <form onSubmit={handleOnSubmit} className="flex flex-col mt-4">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props, index) => (
              <input
                {...props}
                className="otp-input"
                style={{
                  backgroundColor: '#2C333F',
                  color: '#F1F2FF',
                  width: '50px', // Width of each OTP input box
                  height: '50px', // Height of each OTP input box
                  fontSize: '20px', // Font size inside the input box
                  margin: '10px', // Spacing between OTP input boxes
                  borderRadius: '8px', // Rounded corners (optional)
                  border:
                    focusIndex === index
                      ? '2px solid yellow'
                      : '1px solid #ccc', // Conditional border on focus
                }}
                onFocus={() => setFocusIndex(index)} // Set focus index when input is focused
                onBlur={() => setFocusIndex(null)} // Reset focus index when input loses focus
              />
            )}
          />
          <button
            className="w-full text-center text-[16px] px-6 py-3 rounded-md font-semibold mt-5
                bg-yellow-50 text-black hover:scale-95 transition-all duration-200 
                shadow-sm shadow-richblack-300"
            type="submit"
          >
            Verify email
          </button>
        </form>
        <div className="flex justify-between items-center">
          <div className="text-richblack-5 text-md mt-5 ml-2">
            <Link to="/login" className="flex gap-x-1 items-center">
              <FaArrowLeftLong />
              <p>Back to login</p>
            </Link>
          </div>
          <div className="flex mt-5 mr-3 text-blue-200 text-md font-bold justify-center items-center cursor-pointer">
            <GiBackwardTime size={24} />
            {signupData && (
              <button
                onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              >
                Resend it
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
