import { configureStore } from "@reduxjs/toolkit";
import postReducer from './states/postSlice';
import userSlice from "./states/userSlice";

export const store = configureStore({
   reducer: {
      post: postReducer,
      user: userSlice
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
