import { ENDPIONTS } from "../constants";
import { loginData, signupData } from "../apiInterfaces";
import { http } from "../http";

export const signup = (data: signupData) => {
    console.log(data)
    return http.post(ENDPIONTS.signup, data)
}

export const login = (data: loginData) => {
    return http.post(ENDPIONTS.login, data)
}
