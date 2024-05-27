import { createThoughtPostInterface } from "../../interfaces";
import { THOUGHT_POST_ENDPOINTS } from "../constants";
import { http } from "../http";

export const getAllThoughtPost = (userToken: string) => {
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.get(THOUGHT_POST_ENDPOINTS.getAll, config)
}


export const getAllTheThoughtPostsOfAPerticulerUser = (loggedUserId: string, userToken: string) => {
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.get(`${THOUGHT_POST_ENDPOINTS.getAllTheThoughtPostsOfAUser}/${loggedUserId}`, config)
}

export const createThoghtPostApiCall = (data: createThoughtPostInterface, userToken: string) => {
    console.log(data, userToken)
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.post(THOUGHT_POST_ENDPOINTS.create, data, config);
}

export const updateThoughtPost = (postId: string, userToken: string, thought: string) => {

    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    return http.put(`${THOUGHT_POST_ENDPOINTS.update}/${postId}`, { thought: thought }, config)
}