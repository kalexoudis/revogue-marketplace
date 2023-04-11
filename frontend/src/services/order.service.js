import {httpClientAuthInstance} from "./index.service";

export const getOrders = async () => {
    return await httpClientAuthInstance.get('/orders');
};

export const getMyOrders = async () => {
    return await httpClientAuthInstance.get('/orders/my-orders')
}

export const getOrderById = async (orderId) => {
    return await httpClientAuthInstance.get(`/orders/${orderId}`)
}

export const createOrder = async (data) => {
    return await httpClientAuthInstance.post('/orders', data)
}

export const payment = async (data) => {
    return await httpClientAuthInstance.post('/orders/pay', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export const updateOrder = async (orderId, data) => {
    return await httpClientAuthInstance.put(`/orders/${orderId}`, data);
}

