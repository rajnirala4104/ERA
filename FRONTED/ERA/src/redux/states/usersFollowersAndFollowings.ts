import { createSlice } from "@reduxjs/toolkit";
import { followersAndFollowings } from "../../interfaces";

const initialState: followersAndFollowings[] = [{
    user: {},
    followedUserId: {}
}]

const followersAndFollowingSlice = createSlice({
    name: "followersAndFollowing",
    initialState,
    reducers: {
        /**
         * This reducer function handles the action of adding a batch of followers and followings to the state.
         * It takes in the current state and the action containing the payload (an array of followers and followings).
         * 
         * It first checks if the payload is falsy (e.g., undefined, null, empty array, etc.). If it is, it simply returns
         * without modifying the state.
         * 
         * If the payload is truthy, it iterates over each object in the payload array. For each object, it checks if it has
         * both a followedUserId and a user property. If it does, it assigns the object to the corresponding index in the state
         * array.
         * 
         * @param {followersAndFollowings[]} state - The current state of the followers and followings.
         * @param {Object} action - The action containing the payload.
         * @param {followersAndFollowings[]} action.payload - The array of followers and followings to be added to the state.
         */
        addFollwersAndFollowings: (state, action) => {
            // Get the payload from the action
            const followersAndFollowingsArray = action.payload;

            // If the payload is falsy, return without modifying the state
            if (!followersAndFollowingsArray) {
                return;
            }

            // Iterate over each object in the payload array
            for (let i = 0; i < followersAndFollowingsArray.length; i++) {
                // Get the current object from the payload array
                const singleObjectFromUser = followersAndFollowingsArray[i];

                // Check if the object has both a followedUserId and a user property
                if (singleObjectFromUser && singleObjectFromUser.followedUserId && singleObjectFromUser.user) {
                    // Assign the object to the corresponding index in the state array
                    state[i] = {
                        followedUserId: singleObjectFromUser.followedUserId,
                        user: singleObjectFromUser.user,
                    };
                }
            }
        },
        resetFollowState: () => initialState
    }
})

export const { addFollwersAndFollowings, resetFollowState } = followersAndFollowingSlice.actions;

export default followersAndFollowingSlice.reducer;