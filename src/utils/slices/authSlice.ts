import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

export type SignupData = {
  accountType: 'Student' | 'Instructor' | 'Admin';
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
  navigate: NavigateFunction;
};

interface AuthState {
  signupData: SignupData | null;
  loading: boolean;
  token: string | null;
}

const initialState: AuthState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token') as string)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setSignupData(state, action: PayloadAction<SignupData | null>) {
      state.signupData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
