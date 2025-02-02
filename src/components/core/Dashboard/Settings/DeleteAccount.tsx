import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../../../services/operations/settingsAPI';
import { AppDispatch } from '../../../../utils/store/store';
import ConfirmationModal, {
  ModalDataProps,
} from '../../../common/ConfirmationModal';
import useAuth from '../../../../hooks/useAuth';
import toast from 'react-hot-toast';

const DeleteAccount = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] =
    useState<ModalDataProps | null>(null);

  const handleDeleteAccount = async () => {
    try {
      if (token) {
        (dispatch as AppDispatch)(deleteProfile(token, navigate));
      }
    } catch (error) {
      toast.error('Could not delete your account, please try later');
    }
  };

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-4/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={() =>
              setConfirmationModal({
                text1: 'Are You Sure?',
                text2: 'You account will be permanently deleted',
                btn1Text: 'Delete',
                btn2Text: 'Cancel',
                btn1Handler: () => handleDeleteAccount(),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            I want to delete my account.
          </button>
        </div>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
};

export default DeleteAccount;
