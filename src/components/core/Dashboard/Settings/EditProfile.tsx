import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingsAPI';
import IconBtn from '../../../common/IconBtn';
import { AppDispatch, RootState } from '../../../../utils/store/store';
import { EDIT_PROFILE_GENDERS_DATA } from '../../../../data/edit-profile-data';
import toast from 'react-hot-toast';

interface ProfileDataProps {
  about: string;
  contactNumber: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  gender: string;
}

const EditProfile = () => {
  const { user } = useSelector((state: RootState) => state.profile);
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDataProps>();

  const submitProfileForm = async (data: ProfileDataProps) => {
    try {
      if (token) {
        (dispatch as AppDispatch)(updateProfile(token, data));
      }
    } catch {
      toast.error('Could not submit the form, please try later');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="mt-10 mb-4 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 px-12">
          <h2 className="text-xl font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="firstName"
                className="lable-style text-sm text-richblack-200 mt-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="form-style w-4/5 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                {...register('firstName', { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="lastName"
                className="lable-style text-sm text-richblack-200 mt-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter first name"
                className="form-style w-4/5 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                {...register('lastName', { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="dateOfBirth"
                className="lable-style text-sm text-richblack-200 mt-1"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="form-style w-4/5 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                {...register('dateOfBirth', {
                  required: {
                    value: true,
                    message: 'Please enter your Date of Birth.',
                  },
                  max: {
                    value: new Date().toISOString().split('T')[0],
                    message: 'Date of Birth cannot be in the future.',
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth ?? ''}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {typeof errors.dateOfBirth.message === 'string'
                    ? errors.dateOfBirth.message
                    : 'Invalid date of birth'}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="gender"
                className="lable-style text-sm text-richblack-200 mt-1"
              >
                Gender
              </label>
              <select
                id="gender"
                className="form-style w-4/5 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                {...register('gender', { required: true })}
                defaultValue={user?.additionalDetails?.gender ?? ''}
              >
                {EDIT_PROFILE_GENDERS_DATA.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="contactNumber"
                className="lable-style text-sm text-richblack-200 mt-1"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style w-4/5 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                {...register('contactNumber', {
                  required: {
                    value: true,
                    message: 'Please enter your Contact Number.',
                  },
                  maxLength: { value: 12, message: 'Invalid Contact Number' },
                  minLength: { value: 10, message: 'Invalid Contact Number' },
                })}
                defaultValue={user?.additionalDetails?.contactNumber ?? ''}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {typeof errors.contactNumber.message === 'string'
                    ? errors.contactNumber.message
                    : 'Invalid date of birth'}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="about"
                className="lable-style text-sm text-richblack-200 mt-1"
              >
                About
              </label>
              <input
                type="text"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style w-4/5 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                {...register('about', { required: true })}
                defaultValue={user?.additionalDetails?.about ?? ''}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
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
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  );
};

export default EditProfile;
