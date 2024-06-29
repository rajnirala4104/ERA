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

/**
 * This function makes an HTTP GET request to the backend API to fetch all the followings
 * of a particular user. It takes in the user's ID and authentication token as parameters.
 *
 * @param {string} userId - The ID of the user whose followings we want to fetch.
 * @param {string} userToken - The authentication token of the user making the request.
 * @returns {Promise} A Promise that resolves to the HTTP response from the server.
 */
export const getAllTheFollowingsOfAPerticularUserApiCall = (userId: string, userToken: string) => {

    // Construct the URL for the API request by appending the user's ID to the endpoint URL.
    const url = `${FOLLOW_ENDPOINT.getAllTheFollowingsOfAPerticularUser}/${userId}`;

    // Set up the request configuration with the appropriate headers.
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`, // Attach the user's authentication token to the request.
        },
    };

    // Make the HTTP GET request to the API endpoint with the constructed URL and request configuration.
    return http.get(url, config);
}

/**
 * This function makes an HTTP DELETE request to the backend API to unfollow a particular user.
 * It takes in the ID of the user being unfollowed and the authentication token of the user making the request.
 *
 * @param {string} followedUserId - The ID of the user being unfollowed.
 * @param {string} userToken - The authentication token of the user making the request.
 * @returns {Promise} A Promise that resolves to the HTTP response from the server.
 */
export const unFollowApiCall = (followedUserId: string, userToken: string) => {

    // Set up the request configuration with the appropriate headers.
    const config = {
        "Content-type": "application/json", // Specify that the request body is in JSON format.
        headers: {
            Authorization: `Bearer ${userToken}`, // Attach the user's authentication token to the request.
        },
    };

    // Construct the URL for the API endpoint by appending the user's ID to the endpoint URL.
    const url = `${FOLLOW_ENDPOINT.delete}/${followedUserId}`;

    // Make the HTTP DELETE request to the API endpoint with the constructed URL and request configuration.
    return http.delete(url, config);
}

/**
 * This function makes an HTTP POST request to the backend API to follow a particular user.
 * It takes in the ID of the user being followed and the authentication token of the user making the request.
 *
 * @param {string} followedUserId - The ID of the user being followed.
 * @param {string} userToken - The authentication token of the user making the request.
 * @returns {Promise} A Promise that resolves to the HTTP response from the server.
 */
export const followApiCall = (followedUserId: string, userToken: string) => {

    // Set up the request configuration with the appropriate headers.
    const config = {
        // Specify that the request body is in JSON format.
        "Content-type": "application/json",
        headers: {
            // Attach the user's authentication token to the request.
            Authorization: `Bearer ${userToken}`,
        },
    };

    // Make the HTTP POST request to the API endpoint with the constructed URL and request configuration.
    // The request body contains the ID of the user being followed.
    return http.post(FOLLOW_ENDPOINT.create, { followedUserId }, config);
}
