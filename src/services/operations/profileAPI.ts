import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { setLoading, setUser } from '../../utils/slices/profileSlice';
import { apiConnector } from '../apisconnector';
import { profileEndpoints } from '../apis';
import { logout } from './authAPI';
import { AppDispatch } from '../../utils/store/store';

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } =
  profileEndpoints;

//fetch User Details function
export function getUserDetails(
  token: string | null,
  navigate: NavigateFunction,
) {
  return async (dispatch: AppDispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const response = await apiConnector({
        method: 'GET',
        url: GET_USER_DETAILS_API,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('GET_USER_DETAILS API RESPONSE............', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log('GET_USER_DETAILS API ERROR............', error);
      toast.error('Could Not Get User Details');
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

//fetch User Enrolled Courses
export async function getUserEnrolledCourses(token: string | null) {
  const toastId = toast.loading('Loading...');
  let result = [];
  try {
    console.log('BEFORE Calling BACKEND API FOR ENROLLED COURSES');
    const response = await apiConnector({
      method: 'GET',
      url: GET_USER_ENROLLED_COURSES_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(
      'After calling backend API for enrolledCourses response = ',
      response,
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log('GET_USER_ENROLLED_COURSES_API API ERROR............', error);
    toast.error('Could Not Get Enrolled Courses');
  }
  toast.dismiss(toastId);
  return result;
}

//fetch instructor data
export async function getInstructorData(token: string | null) {
  const toastId = toast.loading('Loading...');
  let result = [];

  try {
    const response = await apiConnector({
      method: 'GET',
      url: profileEndpoints.GET_INSTRUCTOR_DATA_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('GET_INSTRUCTOR_API_RESPONSE  = ', response);
    result = response?.data?.courses;
  } catch (error) {
    console.log('GET_INSTRUCTOR_API ERROR', error);
    toast.error('Could not Get Instructor Data');
  }

  toast.dismiss(toastId);
  return result;
}
