import { POST_ENDPOINT } from "../constants";
import { http } from "../http";

export const getAllThePosts = (userToken: string) => {
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.get(POST_ENDPOINT.getAllpost, config)
}
