import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPasswordResetToken } from '../../services/operations/authAPI';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col w-1/3">
          <h1 className="text-richblack-5 text-3xl font-semibold mb-3">
            {emailSent ? 'Check your email' : 'Reset your password'}
          </h1>
          <p className="text-richblack-500">
            {emailSent
              ? `We have sent the reset email to ${email}`
              : `Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery`}
          </p>
          <form onSubmit={handleOnSubmit} className="flex flex-col">
            {!emailSent && (
              <label>
                <p>Email</p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </label>
            )}
            <button
              type="submit"
              className="w-2/3 text-center text-[16px] px-6 py-3 rounded-md font-bold 
                                 bg-yellow-50 text-black hover:scale-95 transition-all duration-200 
                                 shadow-sm shadow-richblack-300"
            >
              {emailSent ? 'Resent Email' : 'Reset Password'}
            </button>
          </form>
          <div className="text-center text-richblack-5">
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
