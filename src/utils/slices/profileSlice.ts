import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  user: Object | null;
  loading: boolean;
}
const initialState: ProfileState = {
  user: null,
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
