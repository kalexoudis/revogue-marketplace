import axios from 'axios';
import {httpClientAuthInstance} from "./index.service";

const API_URL = "http://localhost:8000/api/users";

export const loginUser = (user, callback, errorCallback) => {
    axios.post(`${API_URL}/login`, user)
        .then(response => {
            console.log(user)
            console.log(response)
            callback(response);
        })
        .catch(error => {
            errorCallback(error)
        })
};

export const otherFeatures = (user, callback, errorCallback) => {
    httpClientAuthInstance.put(`${API_URL}/other_features`, user)
        .then(response => {
            //console.log(user)
            //console.log(response)
            callback(response);
        })
        .catch(error => {
            errorCallback(error)
        })
};

export const bodyMeasurements = (user, callback, errorCallback) => {
    httpClientAuthInstance.put(`${API_URL}/body_measurements/`, user)
        .then(response => {
            console.log(user)
            console.log(response)
            callback(response);
        })
        .catch(error => {
            errorCallback(error)
        })
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("is_seller");
    localStorage.removeItem("is_admin");
    window.location.href = "/";
};

export const registerUser = (user, callback, errorCallback) => {
    axios.post(`${API_URL}/register`, user)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorCallback(error)
        })
};

export const getMe = (callback, errorCallback) => {
    httpClientAuthInstance.get(`${API_URL}/me`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorCallback(error);
        })
}

export const updateUser = (user, callback, errorCallback) => {
    httpClientAuthInstance.put(`${API_URL}/profile`, user)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorCallback(error);
        })
}
