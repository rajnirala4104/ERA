import { user } from "../../interfaces";
import { ENDPIONTS } from "../constants";
import { http } from "../http";

export const getSingleUserInformation = (userToken: string, userId: string) => {
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.get(`${ENDPIONTS.getSingpleUser}/${userId}`, config)
}

export const userProfileInformation = (userToken: string, userId: string, updatedData: user) => {

    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }

    return http.put(`${ENDPIONTS.updateUser}/${userId}`, updatedData, config);
} 
