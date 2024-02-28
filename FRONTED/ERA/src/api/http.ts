import axios from "axios";
import { BASE_URL, REQUEST_TIMEOUT } from "./constants";

export const http = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT
})