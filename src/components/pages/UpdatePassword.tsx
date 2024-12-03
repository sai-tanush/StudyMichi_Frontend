import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/operations/authAPI';
import { Link, useLocation } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const UpdatePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
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
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Choose new Password</h1>
          <p>Almost done. Enter your new password and you're all set.</p>
          <form onSubmit={handleOnSubmit}>
            <label>
              <p>New Password</p>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>
            <label>
              <p>Confirm Password</p>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="confirmpassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? (
                  <AiFillEyeInvisible fontSize={24} />
                ) : (
                  <AiFillEye fontSize={24} />
                )}
              </span>
            </label>

            <button type="submit">Reset Password</button>
          </form>
          <div>
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
