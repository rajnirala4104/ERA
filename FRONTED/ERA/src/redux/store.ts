import { configureStore } from "@reduxjs/toolkit";
import postReducer from './states/postSlice';
import followersAndFollowings from './states/usersFollowersAndFollowings'

export const store = configureStore({
   reducer: {
      post: postReducer,
      followersAndFollowings: followersAndFollowings
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
