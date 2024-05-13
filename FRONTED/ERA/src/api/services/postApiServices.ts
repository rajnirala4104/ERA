import { createPostDataInterface } from "../../interfaces";
import { POST_ENDPOINT } from "../constants";
import { http } from "../http";

export const getAllThePosts = (userToken: string) => {
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.get(POST_ENDPOINT.getAllpost, config)
}

export const createPostApiCall = (data: createPostDataInterface, userToken: string) => {
    console.log(data, userToken)
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.post(POST_ENDPOINT.createPost, data, config);
}

export const getAllThePostOfAPerticulerUser = (loggedUserId: string, userToken: string) => {
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.get(`${POST_ENDPOINT.getAllPostsOfAPerticulerUser}/${loggedUserId}`, config)
}