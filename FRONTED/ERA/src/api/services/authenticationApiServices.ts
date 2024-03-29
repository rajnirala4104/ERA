import { loginData, signupData } from "../apiInterfaces";
import { ENDPIONTS } from "../constants";
import { http } from "../http";

export const signup = (data: signupData) => {
    return http.post(ENDPIONTS.signup, data, {
        headers: {
            "Content-type": "application/json",
        },
    })
}

export const login = (data: loginData) => {
    return http.post(ENDPIONTS.login, data)
}
