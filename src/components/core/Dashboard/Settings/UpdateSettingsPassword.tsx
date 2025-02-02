import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { changePassword } from '../../../../services/operations/settingsAPI';
import IconBtn from '../../../common/IconBtn';
import useAuth from '../../../../hooks/useAuth';
import toast from 'react-hot-toast';

interface UpdatePasswordDataProps {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const UpdateSettingsPassword = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordDataProps>();

  const submitPasswordForm = async (data: UpdatePasswordDataProps) => {
    const updatedData = {
      ...data,
      confirmNewPassword: data.newPassword,
    };

    try {
      if (token) {
        await changePassword(token, updatedData);
      }
    } catch {
      toast.error('Could not submit password, please try again later');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="mt-10 mb-4 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="w-full flex justify-between">
              <div className="relative flex flex-col gap-2 lg:w-full">
                <label
                  htmlFor="oldPassword"
                  className="lable-style text-sm text-richblack-200 mt-1"
                >
                  Current Password
                </label>
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  id="oldPassword"
                  placeholder="Enter Current Password"
                  className="form-style w-4/5 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                  {...register('oldPassword', { required: true })}
                />
                <span
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute right-[25%] top-[43px] z-[10] cursor-pointer"
                >
                  {showOldPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
                {errors.oldPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your Current Password.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-y-5 w-full">
                <div className="relative flex flex-col gap-2 lg:w-full">
                  <label
                    htmlFor="newPassword"
                    className="lable-style text-sm text-richblack-200 mt-1"
                  >
                    New Password
                  </label>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    placeholder="Enter New Password"
                    className="form-style w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    {...register('newPassword', { required: true })}
                  />
                  <span
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-[5%] top-[44px] z-[10] cursor-pointer"
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                  {errors.newPassword && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter your New Password.
                    </span>
                  )}
                </div>
                <div className="relative flex flex-col gap-2 lg:w-full">
                  <label
                    htmlFor="newPassword"
                    className="lable-style text-sm text-richblack-200 mt-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="confirmNewPassword"
                    placeholder="Enter Confirm New Password"
                    className="form-style w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    {...register('confirmNewPassword', { required: true })}
                  />
                  <span
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-[5%] top-[44px] z-[10] cursor-pointer"
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                  {errors.newPassword && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      Please enter your Confirm New Password.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate('/dashboard/my-profile');
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  );
};

export default UpdateSettingsPassword;
