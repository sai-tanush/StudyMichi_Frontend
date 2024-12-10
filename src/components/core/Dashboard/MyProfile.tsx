import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/store/store';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const MyProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();

  console.log('user details = ', user);

  return (
    <div className=" mx-5">
      <h1 className="text-4xl text-richblack-5">My Profile</h1>

      <div className="w-2/3 flex flex-col gap-y-5 mx-[7%] px-[7%]">
        {/* Section 1 */}
        {user && (
          <div className="flex justify-between items-center mt-10 bg-richblack-800 p-5 rounded-xl">
            <div className="flex items-center gap-x-8">
              <img
                src={`${user.image}`}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[78px] rounded-full object-cover"
              />
              <div>
                <p className="text-xl font-semibold text-richblack-5">
                  {user?.firstName + ' ' + user?.lastName}
                </p>
                <p className="text-md text-richblack-200 mt-1">{user?.email}</p>
              </div>
            </div>
            <IconBtn
              text="Edit"
              customClasses="flex gap-3 items-center"
              iconName="VscEdit"
              onclick={() => {
                navigate('/dashboard/settings');
              }}
            ></IconBtn>
          </div>
        )}

        {/* section 2 */}
        <div className="flex justify-between items-center bg-richblack-800 p-5 rounded-xl">
          <div className="flex flex-col items-start gap-x-8">
            <p className="text-left text-xl font-semibold text-richblack-5">
              About
            </p>
            <p className="text-left text-md mt-1 text-richblack-200">
              {' '}
              {user?.additionalDetails?.about ??
                'Write Something about Yourself...'}
            </p>
          </div>

          <IconBtn
            text="Edit"
            customClasses="flex gap-3 items-center"
            iconName="VscEdit"
            onclick={() => {
              navigate('/dashboard/settings');
            }}
          ></IconBtn>
        </div>

        {/* section 3 */}
        <div className="flex justify-between items-start bg-richblack-800 p-5 rounded-xl">
          <div className="flex flex-col items-start gap-x-8">
            <p className="text-left text-xl font-semibold text-richblack-5">
              Personal Details
            </p>
            <div className="flex gap-x-14 mt-10">
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col">
                  <p className="text-sm text-richblack-200 mt-1">First Name</p>
                  <p className="text-left font-semibold text-md mt-1 text-richblack-5">
                    {user?.firstName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-richblack-200 mt-1">Last Name</p>
                  <p className="text-left font-semibold text-md mt-1 text-richblack-5">
                    {user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-richblack-200 mt-1">Email</p>
                  <p className="text-left font-semibold text-md mt-1 text-richblack-5">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-y-5">
                <div>
                  <p className="text-sm text-richblack-200 mt-1">Gender</p>
                  <p className="text-left font-semibold text-md mt-1 text-richblack-5">
                    {user?.additionalDetails?.gender ?? 'Add your Gender'}
                  </p>
                </div>
                <div>
                  <p className="text-sm  text-richblack-200 mt-1">
                    Phone Number
                  </p>
                  <p className="text-left font-semibold text-md mt-1 text-richblack-5">
                    {user?.additionalDetails?.contactNumber ??
                      'Add Contact Number'}
                  </p>
                </div>
                <div>
                  <p className="text-sm  text-richblack-200 mt-1">
                    Date of Birth
                  </p>
                  <p className="text-left font-semibold text-md mt-1 text-richblack-5">
                    {user?.additionalDetails?.dateOfBirth ??
                      'Add Date of Birth'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <IconBtn
            text="Edit"
            customClasses="flex gap-3 items-center"
            iconName="VscEdit"
            onclick={() => {
              navigate('/dashboard/settings');
            }}
          ></IconBtn>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
