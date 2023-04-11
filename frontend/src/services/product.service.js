import axios from 'axios';
import {httpClientAuthInstance} from "./index.service";

const API_URL = process.env.REACT_APP_API_BASE_URL + "/products";

export const getProducts = (queryString, callback, errorCallback, finallyCallback) => {
    axios.get(API_URL + '?' + queryString)
        .then(response => {
            callback(response.data.products);
        })
        .catch(error => {
            errorCallback(error);
        })
        .finally(() => {
            finallyCallback()
        })
};

export const getMyProducts = (callback, errorCallback) => {
    httpClientAuthInstance.get(API_URL + '/myproducts')
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            errorCallback(error);
        })
}

export const getProductById = (id, callback, errorCallback, finalCallback) => {
    axios.get(`${API_URL}/${id}`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorCallback(error)
        }).finally(() => {
            finalCallback()
    })
};

export const createProduct = (product, callback, errorCallback) => {
    httpClientAuthInstance.post(API_URL, product)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorCallback(error)
        })
};

export const updateProduct = (product, callback, errorCallback) => {
    httpClientAuthInstance.put(`${API_URL}/${product._id}`, product)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorCallback(error)
        })
};

export const deleteProduct = (id, callback, errorCallback) => {
    httpClientAuthInstance.delete(`${API_URL}/${id}`)
        .then(response => {
            callback(response);
        })
        .catch(error => {
            errorCallback(error)
        })
};
