import { toast } from 'react-hot-toast';
import { apiConnector } from '../apisconnector';
import { courseEndpoints } from '../apis';
import {
  CourseProps,
  SectionProps,
  SubSectionProps,
} from '../../utils/slices/courseSlice';

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

interface DeleteSectionProps {
  courseId: string | undefined;
  sectionId: string;
}

interface DeleteSubSectionProps {
  sectionId: string;
  subSectionId: string;
}

interface DeleteCourseProps {
  courseId: string;
}

//fetch All courses function
export const getAllCourses = async () => {
  const toastId = toast.loading('Loading...');
  let result = [];
  try {
    const response = await apiConnector({
      method: 'GET',
      url: GET_ALL_COURSE_API,
    });
    if (!response?.data?.success) {
      throw new Error('Could Not Fetch Course Categories');
    }
    result = response?.data?.data;
  } catch {
    toast.error('Could not fetch Courses');
  }
  toast.dismiss(toastId);
  return result;
};

//fetch particular Course Details function
export const fetchCourseDetails = async (courseId: string | undefined) => {
  const toastId = toast.loading('Loading...');
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector({
      method: 'POST',
      url: COURSE_DETAILS_API,
      bodyData: {
        courseId: courseId,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch {
    toast.error('Could not fetch ');
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

// fetch the available course categories
export const fetchCourseCategories = async () => {
  let result = [];
  try {
    const response = await apiConnector({
      method: 'GET',
      url: COURSE_CATEGORIES_API,
    });
    if (!response?.data?.success) {
      throw new Error('Could Not Fetch Course Categories');
    }
    result = response?.data?.allCategories;
  } catch {
    toast.error('Cannot fetch course categories');
  }
  return result;
};

// add the course details
export const addCourseDetails = async (
  data: CourseProps,
  token: string | null,
) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_COURSE_API,
      bodyData: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error('Could Not Add Course Details');
    }
    toast.success('Course Details Added Successfully');
    result = response?.data?.data;
  } catch {
    toast.error('Unable to add course');
  }
  toast.dismiss(toastId);
  return result;
};

// edit the course details
export const editCourseDetails = async (
  data: CourseProps,
  token: string | null,
) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: EDIT_COURSE_API,
      bodyData: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error('Could Not Update Course Details');
    }
    toast.success('Course Details Updated Successfully');
    result = response?.data?.data;
  } catch {
    toast.error('Unable to edit course');
  }
  toast.dismiss(toastId);
  return result;
};

// create a section
export const createSection = async (
  data: SectionProps,
  token: string | null,
) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_SECTION_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error('Could Not Create Section');
    }
    toast.success('Course Section Created');
    result = response?.data?.updateCourseDetails;
  } catch {
    toast.error('Unable to create section');
  }
  toast.dismiss(toastId);
  return result;
};

// create a subsection
export const createSubSection = async (
  data: SubSectionProps,
  token: string | null,
) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_SUBSECTION_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error('Could Not Add Lecture');
    }
    toast.success('Lecture Added');
    result = response?.data?.data;
  } catch {
    toast.error('Unable to create sub-section');
  }
  toast.dismiss(toastId);
  return result;
};

// update a section
export const updateSection = async (
  data: SectionProps,
  token: string | null,
) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: UPDATE_SECTION_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error('Could Not Update Section');
    }
    toast.success('Course Section Updated');
    result = response?.data?.data;
  } catch {
    toast.error('unable to update section');
  }
  toast.dismiss(toastId);
  return result;
};

// update a subsection
export const updateSubSection = async (
  data: SubSectionProps,
  token: string | null,
) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: UPDATE_SUBSECTION_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error('Could Not Update Lecture');
    }
    toast.success('Lecture Updated');
    result = response?.data?.data;
  } catch {
    toast.error('Unable to update sub-section');
  }
  toast.dismiss(toastId);
  return result;
};

// delete a section
export const deleteSection = async (
  data: DeleteSectionProps,
  token: string | null,
) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: DELETE_SECTION_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error('Could Not Delete Section');
    }
    toast.success('Course Section Deleted');
    result = response?.data?.data;
  } catch {
    toast.error('Unable to delete section');
  }
  toast.dismiss(toastId);
  return result;
};
// delete a subsection
export const deleteSubSection = async (
  data: DeleteSubSectionProps,
  token: string | null,
) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: DELETE_SUBSECTION_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error('Could Not Delete Lecture');
    }
    toast.success('Lecture Deleted');
    result = response?.data?.data;
  } catch {
    toast.error('Unable to delete sub-section');
  }
  toast.dismiss(toastId);
  return result;
};

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token: string | null) => {
  let result = [];
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'GET',
      url: GET_ALL_INSTRUCTOR_COURSES_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error('Could Not Fetch Instructor Courses');
    }
    result = response?.data?.data;
  } catch {
    toast.error('Unable to fetch instructor courses');
  }
  toast.dismiss(toastId);
  return result;
};

// delete a course
export const deleteCourse = async (
  data: DeleteCourseProps,
  token: string | null,
) => {
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'DELETE',
      url: DELETE_COURSE_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.success) {
      throw new Error('Could Not Delete Course');
    }
    toast.success('Course Deleted');
  } catch {
    toast.error('Unable to delete a course');
  }
  toast.dismiss(toastId);
};

// get full details of a course
export const getFullDetailsOfCourse = async (
  courseId: string | undefined,
  token: string | null,
) => {
  const toastId = toast.loading('Loading...');
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector({
      method: 'POST',
      url: GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      bodyData: {
        courseId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch {
    toast.error('Unable to fetch Course Details');
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

// mark a lecture as complete
export const markLectureAsComplete = async (data, token: string | null) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector({
      method: 'POST',
      url: LECTURE_COMPLETION_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success('Lecture Completed');
    result = true;
  } catch {
    toast.error('Unable to mark lecture as completed');
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};

// create a rating for course
export const createRating = async (data, token: string | null) => {
  const toastId = toast.loading('Loading...');
  let success = false;
  try {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_RATING_API,
      bodyData: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response?.data?.success) {
      throw new Error('Could Not Create Rating');
    }
    toast.success('Rating Created');
    success = true;
  } catch {
    success = false;
    toast.error('Rating cannot be created');
  }
  toast.dismiss(toastId);
  return success;
};
