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
  __v: number;
}

export interface SectionProps {
  _id: string;
  sectionName: string;
  __v: number;
  subSection: SubSectionProps[];
}

interface ReviewCourse {
  courseName: string;
  _id: string;
}

interface ReviewUser {
  email: string;
  firstName: string;
  image: string;
  lastName: string;
  _id: string;
}

export interface ReviewAndRatingProps {
  course: ReviewCourse;
  rating: number;
  review: string;
  user: ReviewUser;
  __v: number;
  _id: string;
}

export interface CourseProps {
  courseName: string;
  courseDescription: string;
  instructor?: UserProps;
  whatYouWillLearn: string;
  courseContent: SectionProps[];
  ratingAndReview: ReviewAndRatingProps[];
  price: number;
  totalDuration?: string;
  progressPercentage?: number;
  thumbnail: string;
  tag: string[];
  category: CategoryProps;
  studentEnrolled: string[];
  instructions: string[];
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
