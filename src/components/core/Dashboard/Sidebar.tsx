import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../utils/store/store';
import Spinner from '../../common/Spinner';
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { sidebarSettingData } from '../../../data/dashboard-links';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal, {
  ModalDataProps,
} from '../../common/ConfirmationModal';

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state: RootState) => state.profile,
  );
  const { loading: authLoading } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] =
    useState<ModalDataProps | null>(null);

  if (authLoading || profileLoading) {
    return (
      <div className="w-screen h-screen z-30">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div
        className="flex flex-col min-w-[222px] border-r-[1px] border-r-richblack-700 
        h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 text-richblack-5"
      >
        <div className="flex flex-col mx-1">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="mx-auto mt-6 mb-1 h-[1px] w-10/12 bg-richblack-600"></div>

        <div className="w-full lex flex-col justify-center items-start gap-y-3 text-richblack-300 mb-2">
          <SidebarLink
            link={sidebarSettingData}
            iconName={sidebarSettingData.icon}
          />

          <button
            onClick={() =>
              setConfirmationModal({
                text1: 'Are You Sure?',
                text2: 'You will be logged out of your Account',
                btn1Text: 'Logout',
                btn2Text: 'Cancel',
                btn1Handler: () => (dispatch as AppDispatch)(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="text-sm font-medium text-richblack-300 ml-8 mt-2.5"
          >
            <div className="flex items-center gap-x-2 text-richblack-300">
              <VscSignOut className="text-lg " />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
