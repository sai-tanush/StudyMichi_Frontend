import { toast } from 'react-hot-toast';

import { setUser } from '../../utils/slices/profileSlice';
import { apiConnector } from '../apisconnector';
import { settingsEndpoints } from '../apis';
import { logout } from './authAPI';
import { AppDispatch } from '../../utils/store/store';
import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(token: string, formData) {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector({
        method: 'PUT',
        url: UPDATE_DISPLAY_PICTURE_API,
        bodyData: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(
        'UPDATE_DISPLAY_PICTURE_API API RESPONSE............',
        response,
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success('Display Picture Updated Successfully');
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log('UPDATE_DISPLAY_PICTURE_API API ERROR............', error);
      toast.error('Could Not Update Display Picture');
    }
    toast.dismiss(toastId);
  };
}

export function updateProfile(token: string, formData) {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector({
        method: 'PUT',
        url: UPDATE_PROFILE_API,
        bodyData: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('UPDATE_PROFILE_API API RESPONSE............', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage }),
      );
      toast.success('Profile Updated Successfully');
    } catch (error) {
      console.log('UPDATE_PROFILE_API API ERROR............', error);
      toast.error('Could Not Update Profile');
    }
    toast.dismiss(toastId);
  };
}

export async function changePassword(token: string, formData) {
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: CHANGE_PASSWORD_API,
      bodyData: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('CHANGE_PASSWORD_API API RESPONSE............', response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success('Password Changed Successfully');
  } catch (error) {
    console.log('CHANGE_PASSWORD_API API ERROR............', error);

    if (error instanceof AxiosError && error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('An unexpected error occurred');
    }
  }
  toast.dismiss(toastId);
}

export function deleteProfile(token: string, navigate: NavigateFunction) {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector({
        method: 'DELETE',
        url: DELETE_PROFILE_API,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('DELETE_PROFILE_API API RESPONSE............', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success('Profile Deleted Successfully');
      dispatch(logout(navigate));
    } catch (error) {
      console.log('DELETE_PROFILE_API API ERROR............', error);
      toast.error('Could Not Delete Profile');
    }
    toast.dismiss(toastId);
  };
}