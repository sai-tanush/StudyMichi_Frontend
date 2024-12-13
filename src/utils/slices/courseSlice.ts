import { createSlice } from '@reduxjs/toolkit';

export interface CategoryProps {
  _id: string;
  name: string;
  description: string;
  courses: string[];
  __v: number;
}

export interface SectionProps {
  _id: string;
  sectionName: string;
  __v: number;
}

export interface CourseProps {
  courseDescription: string;
  instructor: string;
  whatYouWillLearn: string;
  courseContent: SectionProps[]; // Replace 'any'
  ratingAndReview: any[]; // Replace 'any'
  price: number;
  thumbnail: string;
  tag: string[]; // Array of strings
  category: CategoryProps[];
  studentEnrolled: any[]; // Replace 'any'
  instructions: string[]; // Array of strings
  status: string;
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
  step: 2,
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

// interface UpdateCourseDetails {
//   _id: string;
//   courseDescription: string;
//   instructor: string;
//   whatYouWillLearn: string;
//   courseContent: Section[]; // Array of Section objects
//   ratingAndReview: any[]; // Replace `any` with a specific type if available
//   price: number;
//   thumbnail: string;
//   tag: string[]; // Array of strings
//   category: string;
//   studentEnrolled: any[]; // Replace `any` with a specific type if available
//   instructions: string[]; // Array of strings
//   status: string;
//   __v: number;
// }
