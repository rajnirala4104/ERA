import { FOLLOW_ENDPOINT } from "../constants"
import { http } from "../http"

export const getAllTheFollowersOfAPerticularUserApiCall = (userId: string, userToken: string) => {

    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };

    return http.get(`${FOLLOW_ENDPOINT.getAllTheFollowersOfAPerticularUser}/${userId}`, config)
}

export const getAllTheFollowingsOfAPerticularUserApiCall = (userId: string, userToken: string) => {

    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };

    return http.get(`${FOLLOW_ENDPOINT.getAllTheFollowingsOfAPerticularUser}/${userId}`, config)
}

export const unFollowApiCall = (followedUserId: string, userToken: string) => {

    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };

    return http.delete(`${FOLLOW_ENDPOINT.delete}/${followedUserId}`, config)
}

export const followApiCall = (followedUserId: string, userToken: string) => {

    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };

    return http.post(FOLLOW_ENDPOINT.create, { followedUserId }, config);
}
