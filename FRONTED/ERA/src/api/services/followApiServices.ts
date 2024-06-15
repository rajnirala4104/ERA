import { FOLLOW_ENDPOINT } from "../constants"
import { http } from "../http"

/**
 * This function makes an HTTP GET request to the backend API to fetch all the followers of a particular user.
 *
 * @param {string} userId - The ID of the user whose followers we want to fetch.
 * @param {string} userToken - The authentication token of the user making the request.
 * @returns {Promise} A Promise that resolves to the HTTP response from the server.
 */
export const getAllTheFollowersOfAPerticularUserApiCall = (userId: string, userToken: string) => {
    // Construct the URL for the API request
    const url = `${FOLLOW_ENDPOINT.getAllTheFollowersOfAPerticularUser}/${userId}`;

    // Set up the request configuration
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`, // Attach the user's authentication token to the request
        },
    };

    // Make the HTTP GET request to the API endpoint
    return http.get(url, config);
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
