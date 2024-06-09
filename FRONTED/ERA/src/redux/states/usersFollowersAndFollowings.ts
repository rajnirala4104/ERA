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
        addFollwersAndFollowings: (state, action) => {
            const followersAndFollowingsArray = action.payload
            for (let i = 0; i < followersAndFollowingsArray.length; i++) {
                const singleObjectFromUser = followersAndFollowingsArray[i];
                state[i].followedUserId = singleObjectFromUser.followedUserId;
                state[i].user = singleObjectFromUser.user;
            }
        },
        resetFollowState: () => initialState
    }
})

export const { addFollwersAndFollowings, resetFollowState } = followersAndFollowingSlice.actions;

export default followersAndFollowingSlice.reducer;