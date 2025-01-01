import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdditionalDetailsProps {
  _id: string;
  gender: string | null;
  dateOfBirth: string | null;
  about: string | null;
  contactNumber: string | null;
  __v: number;
}

export interface UserProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: 'Instructor' | 'Student' | 'Admin';
  active: boolean;
  approved: boolean;
  additionalDetails: AdditionalDetailsProps;
  courses: string[]; // Array of course IDs
  image: string; // URL to the user's image
  courseProgress: any[]; // Replace `any`
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  token: string; // JWT token
}

interface initialStateProps {
  user: UserProps;
  loading: boolean;
}

const initialState: initialStateProps = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
  loading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
