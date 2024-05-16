import { createSlice } from "@reduxjs/toolkit";
import { postInterface } from "../../interfaces";

const initialState: postInterface = {};

const postSlice = createSlice({
      name: "post",
      initialState,
      reducers: {
            addPost: (state, action) => {
                  const postObject = action.payload;
                  state._id = postObject._id;
                  state.caption = postObject.caption;
                  state.createdAt = postObject.createdAt;
                  state.content = postObject.content;
                  state.thought = postObject.thought;
                  state.updateAt = postObject.updateAt;
                  state.user = postObject.user;
            },
            resetState: () => initialState
      }
})

export const { addPost, resetState } = postSlice.actions;

export default postSlice.reducer;
