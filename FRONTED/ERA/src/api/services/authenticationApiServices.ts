import { forgotPasswordsDataInterface, loginData, signupData } from "../apiInterfaces";
import { ENDPIONTS } from "../constants";
import { http } from "../http";

/**
 * This function sends a POST request to the signup endpoint of the API 
 * with the provided user data. The user data is expected to be in the form
 * of an object that matches the signupData interface in apiInterfaces.ts.
 * The function logs the user data to the console before sending the request.
 * The request is made with the "Content-type" header set to "application/json".
 * 
 * @param {signupData} data - An object containing the user's signup data.
 * @return {Promise} A Promise that resolves to the response from the API.
 */
export const signup = (data: signupData) => {

    // Log the user data to the console for debugging purposes
    console.log(data)

    // Send a POST request to the signup endpoint of the API with the user data
    return http.post(ENDPIONTS.signup, data, {
        headers: {
            // Set the "Content-type" header to "application/json"
            "Content-type": "application/json",
        },
    })
}

/**
 * This function sends a POST request to the login endpoint of the API
 * with the provided login data. The login data is expected to be in the form
 * of an object that matches the loginData interface in apiInterfaces.ts.
 * The function does not log anything to the console.
 * The request is made without any additional headers.
 * 
 * @param {loginData} data - An object containing the user's login data.
 * @return {Promise} A Promise that resolves to the response from the API.
 */
export const login = (data: loginData) => {
    // Send a POST request to the login endpoint of the API with the login data
    return http.post(ENDPIONTS.login, data)
}

/**
 * This function sends a GET request to the API's getAllTheUser endpoint.
 * It includes the user's logged in token in the Authorization header of the request.
 * The request is made with the "Content-type" header set to "application/json".
 * 
 * @param {string} loggedUserToken - The user's logged in token.
 * @return {Promise} A Promise that resolves to the response from the API.
 */
export const getAllTheUser = (loggedUserToken: string) => {
    // Create a configuration object for the request
    const config = {
        // Set the "Content-type" header to "application/json"
        "Content-type": "application/json",
        // Include the user's logged in token in the Authorization header
        headers: {
            Authorization: `Bearer ${loggedUserToken}`,
        },
    };
    // Send a GET request to the API's getAllTheUser endpoint with the configuration
    return http.get(ENDPIONTS.getAllTheUser, config);
}

/**
 * This function sends a PUT request to the API's password endpoint with the
 * provided data. The data is expected to be in the form of an object that
 * matches the forgotPasswordsDataInterface in apiInterfaces.ts.
 * 
 * The function does not log anything to the console.
 * The request is made with the "Content-type" header set to "application/json".
 * 
 * @param {forgotPasswordsDataInterface} data - An object containing the user's
 * email that needs to be reset.
 * @return {Promise} A Promise that resolves to the response from the API.
 */
export const forgotPassword = (data: forgotPasswordsDataInterface) => {
    // Create a configuration object for the request
    const config = {
        // Set the "Content-type" header to "application/json"
        "Content-type": "application/json",
    };
    // Send a PUT request to the API's password endpoint with the data and the configuration
    return http.put(ENDPIONTS.password, data, config);
}
