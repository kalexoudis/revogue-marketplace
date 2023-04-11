import axios from 'axios';
import {isAuthenticated} from "../utils/auth";

const baseConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL
}

const httpClient = (config) => {
    return axios.create({
        ...baseConfig,
        ...config
    })
}

export const httpClientInstance = httpClient();

export const httpClientAuthInstance = httpClient({
    headers: {
        Authorization : `Bearer ${localStorage.getItem("token")}`
    }
})
