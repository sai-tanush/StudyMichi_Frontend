import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/operations/authAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Spinner from '../common/Spinner';
import { FaArrowLeftLong } from 'react-icons/fa6';

const UpdatePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const { password, confirmPassword } = formData;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = location.pathname.split('/').slice(-1)[0];
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col w-1/4 mt-[-100px]">
          <h1 className="text-richblack-5 text-3xl font-semibold mb-3">
            Choose new Password
          </h1>
          <p className="text-richblack-200">
            Almost done. Enter your new password and you're all set.
          </p>
          <form onSubmit={handleOnSubmit} className="flex flex-col mt-4">
            <label className="block">
              <p className="text-richblack-25 text-sm inline-flex items-center">
                New Password
                <span className="text-red-300 ml-1">*</span>
              </p>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
                className="w-full p-3.5 mt-1 rounded-lg bg-richblack-700 text-richblack-5"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>
            <label className="block">
              <p className="text-richblack-25 text-sm inline-flex items-center">
                Confirm new password
                <span className="text-red-300 ml-1">*</span>
              </p>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
                className="w-full p-3.5 mt-1 rounded-lg bg-richblack-700 text-richblack-5"
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="w-full text-center text-[16px] px-6 py-3 rounded-md font-semibold mt-5
                                 bg-yellow-50 text-black hover:scale-95 transition-all duration-200 
                                 shadow-sm shadow-richblack-300"
            >
              Reset Password
            </button>
          </form>
          <div className="text-richblack-200 text-sm mt-5 ml-2">
            <Link to="/login" className="flex gap-x-1 items-center">
              <FaArrowLeftLong />
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
