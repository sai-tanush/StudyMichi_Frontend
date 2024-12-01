import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Infer the RootState type from the store
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch for dispatching actions
export type AppDispatch = typeof store.dispatch;
