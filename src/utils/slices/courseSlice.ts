import { createSlice } from '@reduxjs/toolkit';
import { UserProps } from './profileSlice';

export interface CategoryProps {
  _id: string;
  name: string;
  description: string;
  courses: string[];
  __v: number;
}

export interface SubSectionProps {
  _id: string;
  sectionId: string;
  title: string;
  description: string;
  videoUrl: string;
  timeDuration: string;
}

export interface SectionProps {
  _id: string;
  sectionName: string;
  __v: number;
  subSection: SubSectionProps[];
}

export interface CourseProps {
  courseName: string;
  courseDescription: string;
  instructor?: UserProps;
  whatYouWillLearn: string;
  courseContent: SectionProps[]; // Replace 'any'
  ratingAndReview: any[]; // Replace 'any'
  price: number;
  thumbnail: string;
  tag: string[]; // Array of strings
  category: CategoryProps;
  studentEnrolled: string[];
  instructions: string[]; // Array of strings
  status: string;
  createdAt: string;
  _id: string;
  __v: number;
}

interface initialStateProps {
  step: number;
  course: CourseProps | null;
  editCourse: boolean;
  paymentLoading: boolean;
}

const initialState: initialStateProps = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
    },
  },
});

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;
