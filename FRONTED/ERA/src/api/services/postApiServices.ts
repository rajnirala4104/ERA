import { createPostDataInterface } from "../../interfaces";
import { POST_ENDPOINT } from "../constants";
import { http } from "../http";

/**
 * This function is used to make a GET request to the server to retrieve all the posts.
 * It takes in the user's token as a parameter and uses it to authenticate the request.
 * The function returns a Promise that resolves to the response from the server.
 *
 * @param {string} userToken - The user's authentication token.
 * @return {Promise} A Promise that resolves to the response from the server.
 */
export const getAllThePosts = (userToken: string) => {
    // Create a configuration object with the content type and authorization header.
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`, // Set the authorization header to include the user's token.
        },
    };
    // Make a GET request to the server to retrieve all the posts.
    return http.get(POST_ENDPOINT.getAllpost, config)
}

/**
 * This function is used to make a POST request to the server to create a new post.
 * It takes in the data for the post and the user's token as parameters, and uses
 * them to authenticate the request. The function returns a Promise that resolves
 * to the response from the server.
 *
 * @param {createPostDataInterface} data - The data for the new post.
 * @param {string} userToken - The user's authentication token.
 * @return {Promise} A Promise that resolves to the response from the server.
 */
export const createPostApiCall = (data: createPostDataInterface, userToken: string) => {
    // Create a configuration object with the content type and authorization header.
    const config = {
        "Content-type": "application/json", // Set the content type to JSON.
        headers: {
            Authorization: `Bearer ${userToken}`, // Set the authorization header to include the user's token.
        },
    };
    // Make a POST request to the server to create the new post.
    return http.post(POST_ENDPOINT.createPost, data, config);
}

/**
 * This function is used to make a GET request to the server to retrieve all the
 * posts that belong to a particular user. It takes in the user's ID and
 * authentication token as parameters, and uses them to authenticate the request.
 *
 * @param {string} userId - The ID of the user whose posts we want to retrieve.
 * @param {string} userToken - The user's authentication token.
 * @return {Promise} A Promise that resolves to the response from the server,
 * containing the posts of the specified user.
 */
export const getAllThePostOfAPerticulerUser = (userId: string, userToken: string) => {
    // Create a configuration object that includes the content type and
    // authorization header.
    const config = {
        "Content-type": "application/json", // Set the content type to JSON.
        headers: {
            Authorization: `Bearer ${userToken}`, // Set the authorization header to include the user's token.
        },
    };
    // Make a GET request to the server to retrieve all the posts of the specified user.
    // The URL is constructed using the user's ID and the endpoint for retrieving all posts.
    return http.get(`${POST_ENDPOINT.getAllPostsOfAPerticulerUser}/${userId}`, config);
}

/**
 * This function is used to make a DELETE request to the server to delete a
 * specific post. It takes in the ID of the post and the user's authentication
 * token as parameters, and uses them to authenticate the request.
 *
 * @param {string} postId - The ID of the post to be deleted.
 * @param {string} userToken - The user's authentication token.
 * @return {Promise} A Promise that resolves to the response from the server,
 * indicating whether or not the post was successfully deleted.
 */
export const deleteApost = (postId: string, userToken: string) => {
    // Create a configuration object that includes the content type and
    // authorization header.
    const config = {
        "Content-type": "application/json", // Set the content type to JSON.
        headers: {
            Authorization: `Bearer ${userToken}`, // Set the authorization header to include the user's token.
        },
    };
    // Make a DELETE request to the server to delete the post with the specified ID.
    // The URL is constructed using the endpoint for deleting posts and the ID of the post.
    return http.delete(`${POST_ENDPOINT.deletePost}/${postId}`, config);
}


/**
 * This function is used to make a PUT request to the server to update a specific post.
 * It takes in the ID of the post, the user's authentication token, and the new caption
 * for the post as parameters. The function uses the provided token to authenticate the request.
 * The function constructs a configuration object that includes the content type and
 * authorization header. It then makes a PUT request to the server to update the post with the
 * specified ID. The URL is constructed using the endpoint for updating posts and the ID of the post.
 * The function also includes the new caption for the post in the request body.
 * 
 * @param {string} postId - The ID of the post to be updated.
 * @param {string} userToken - The user's authentication token.
 * @param {string} captionAsData - The new caption for the post.
 * @return {Promise} A Promise that resolves to the response from the server,
 * indicating whether or not the post was successfully updated.
 */
export const updatePost = (postId: string, userToken: string, captionAsData: string) => {

    // Create a configuration object that includes the content type and
    // authorization header.
    const config = {
        "Content-type": "application/json", // Set the content type to JSON.
        headers: {
            Authorization: `Bearer ${userToken}` // Set the authorization header to include the user's token.
        }
    }

    // Make a PUT request to the server to update the post with the specified ID.
    // The URL is constructed using the endpoint for updating posts and the ID of the post.
    // The function also includes the new caption for the post in the request body.
    return http.put(`${POST_ENDPOINT.updatePost}/${postId}`, { caption: captionAsData }, config)
}
