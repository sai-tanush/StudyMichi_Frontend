import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiUpload } from 'react-icons/fi';
import { AppDispatch, RootState } from '../../../../utils/store/store';
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI';
import IconBtn from '../../../common/IconBtn';
import useAuth from '../../../../hooks/useAuth';
import toast from 'react-hot-toast';

const ChangeProfilePicture = () => {
  const { token } = useAuth();
  const { user } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0]; // Access the first file
      setImageFile(file);
      previewFile(file);
    } else {
      toast.error('No file selected');
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (!imageFile) throw new Error('No file selected for upload');
      formData.append('displayPicture', imageFile);
      if (token) {
        await (dispatch as AppDispatch)(updateDisplayPicture(token, formData));
      }
    } catch (error) {
      toast.error('could not upload file');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div
      className="flex items-center justify-between rounded-md border-[1px] border-richblack-700
     bg-richblack-800 p-5 px-12 text-richblack-5"
    >
      <div className="flex items-center gap-x-4">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="mb-2">Change Profile Picture</p>
          <div className="flex flex-row gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
            >
              Select
            </button>
            <IconBtn
              text={loading ? 'Uploading...' : 'Upload'}
              onclick={handleFileUpload}
            >
              {!loading && <FiUpload className="text-lg text-richblack-900" />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
