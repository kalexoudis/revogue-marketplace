import {httpClientAuthInstance} from "./index.service";

export const getPoints = async () => {
    return await httpClientAuthInstance.get('/points');
};

export const addPointsForAcceptedProductInOrder = async (data) => {
    return await httpClientAuthInstance.put('/points/', data)
};

export const deductPoints = async (data) => {
    return await httpClientAuthInstance.put('/points/use-points', data)
};
