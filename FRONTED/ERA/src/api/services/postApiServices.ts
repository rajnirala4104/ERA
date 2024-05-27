import { createPostDataInterface } from "../../interfaces";
import { ENDPIONTS, POST_ENDPOINT } from "../constants";
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

export const getAllThePostOfAPerticulerUser = (userId: string, userToken: string) => {
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.get(`${POST_ENDPOINT.getAllPostsOfAPerticulerUser}/${userId}`, config)
}

export const deleteApost = (postId: string, userToken: string) => {

    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    return http.delete(`${POST_ENDPOINT.deletePost}/${postId}`, config);
}


export const updatePost = (postId: string, userToken: string, captionAsData: string) => {

    console.log(postId, userToken, captionAsData)

    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    return http.put(`${POST_ENDPOINT.updatePost}/${postId}`, { caption: captionAsData }, config)
}