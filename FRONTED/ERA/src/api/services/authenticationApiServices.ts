import { forgotPasswordsDataInterface, loginData, signupData } from "../apiInterfaces";
import { ENDPIONTS } from "../constants";
import { http } from "../http";

export const signup = (data: signupData) => {

    console.log(data)

    return http.post(ENDPIONTS.signup, data, {
        headers: {
            "Content-type": "application/json",
        },
    })
}

export const login = (data: loginData) => {
    return http.post(ENDPIONTS.login, data)
}

export const getAllTheUser = (loggedUserToken: string) => {
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${loggedUserToken}`,
        },
    };
    return http.get(ENDPIONTS.getAllTheUser, config);
}

export const forgotPassword = (data: forgotPasswordsDataInterface) => {
    return http.put(ENDPIONTS.password, data, {
        headers: {
            "Content-type": "application/json",
        },
    });
}