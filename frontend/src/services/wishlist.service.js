import {httpClientAuthInstance} from "./index.service";

export const getWishlist = async () => {
    return await httpClientAuthInstance.get('/wishlist');
};

export const addProductToWishlist = async (data) => {
    return await httpClientAuthInstance.post('/wishlist', data)
};

export const deleteProductInWishlist = async (productId) => {
    return await httpClientAuthInstance.delete(`/wishlist/${productId}`);
};