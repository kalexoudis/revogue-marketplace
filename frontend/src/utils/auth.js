import jwtDecode from 'jwt-decode'

export const getDecodedToken = () => {
    let token = localStorage.getItem('token');
    if (token) {
        return jwtDecode(token);
    }
    return null;
};

export const isAuthenticated = () => {
    let decodedToken = getDecodedToken();

    if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        return true;
    }
    //If the token is expired then remove from localStorage
    localStorage.removeItem('token')
    return false;
};