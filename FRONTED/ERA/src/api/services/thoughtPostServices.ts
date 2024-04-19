import { THOUGHT_POST_ENDPOINTS } from "../constants";
import { http } from "../http";

export const getAllThoughtPost = (userToken: string) => {
    const config = {
        "Content-type": "application/json",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    return http.get(THOUGHT_POST_ENDPOINTS.getAll, config)
}
