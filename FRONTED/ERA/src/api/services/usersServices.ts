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