import ChangeProfilePicture from './ChangeProfilePicture';
import DeleteAccount from './DeleteAccount';
import EditProfile from './EditProfile';
import UpdateSettingsPassword from './UpdateSettingsPassword';

const Settings = () => {
  return (
    <div>
      <h1 className="mb-7 text-4xl text-left font-medium text-richblack-5">
        Edit Profile
      </h1>
      <div className="w-2/3 flex flex-col gap-y-5 mx-[7%] px-[7%]">
        <ChangeProfilePicture />
        <EditProfile />
        <UpdateSettingsPassword />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
