import {httpClientAuthInstance} from "./index.service";
import axios from "axios";

export const getBasket = async () => {
    return await httpClientAuthInstance.get('/basket');
};

export const addProductToBasket = async(data) => {
    return await httpClientAuthInstance.post('/basket', data)
};

export const deleteProductInBasket = async(productObjId) => {
    return await httpClientAuthInstance.delete(`/basket/${productObjId}`);
};

export const updateItemInBasket = async(productObjId, data) => {
    return await httpClientAuthInstance.put(`/basket/${productObjId}`, data);
};

export const clearBasket = async() => {
    return await httpClientAuthInstance.delete('/basket')
}

