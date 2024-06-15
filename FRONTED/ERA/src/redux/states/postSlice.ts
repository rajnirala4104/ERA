import { createSlice } from "@reduxjs/toolkit";
import { postInterface } from "../../interfaces";

const initialState: postInterface = {};

const postSlice = createSlice({
      name: "post",
      initialState,
      reducers: {
            /**
             * This reducer function updates the state with the new post data.
             * It takes in the current state and the action object.
             * The action object contains the payload, which is the new post data.
             * The payload is destructured to extract the necessary properties.
             * If the payload is undefined, an empty object is used as the default value.
             * The Object.assign() method is used to merge the new post data with the current state.
             * This ensures that only the specified properties are updated and the rest of the state remains unchanged.
             *
             * @param {postInterface} state - The current state of the post interface.
             * @param {Object} action - The action object containing the payload with the new post data.
             * @returns {void} This function does not return anything.
             */
            addPost: (state, action) => {
                  // Destructure the payload of the action object to extract the new post data
                  const { _id, caption = "", createdAt = "", content = "", thought = "", updateAt = "", user = "" } = action.payload || {};

                  // Use Object.assign() to merge the new post data with the current state
                  Object.assign(state, { _id, caption, createdAt, content, thought, updateAt, user });
            },
            resetState: () => initialState
      }
})

export const { addPost, resetState } = postSlice.actions;

export default postSlice.reducer;
