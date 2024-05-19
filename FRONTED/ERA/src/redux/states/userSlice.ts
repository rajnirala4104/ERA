import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../interfaces";

const initialState: user = {};

const userSlice = createSlice({
      name: "user",
      initialState,
      reducers: {
            addUser: (state, action) => {
                  const postObject = action.payload;
                  state._id = postObject._id
                  state.bio = postObject.bio
                  state.email = postObject.email
                  state.name = postObject.name
                  state.profilePic = postObject.profilePic
                  state.token = postObject.token
            },
            resetUser: () => initialState
      }
})

export const { addUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
