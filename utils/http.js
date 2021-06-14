import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const httpClient = axios.create();
httpClient.defaults.timeout = 1200000;

const baseUrl = "http://localhost:8080/"

const _request = async (url, method, data, config = {}) => {
    const headers = isAuthenticated() ? {...config.headers, Authorization: `Bearer ${getToken()}`} : config.headers;

    return httpClient({
        url: baseUrl + url,
        method,
        data,
        headers, ...config.options
    }).then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 204) return res.data;
        else throw (res.data);
    }).catch(errorResponse => {
        throw (errorResponse.response || {status: 500})
    })
}

export const get = (url, config) => _request(url, "GET", null, config);
export const post = (url, body, config = {}) => _request(url, "POST", body, config);
export const put = (url, body, config = {}) => _request(url, "PUT", body, config);
export const patch = (url, body, config = {}) => _request(url, "PATCH", body, config);
export const deleteRequest = (url, body, config = {}) => _request(url, "DELETE", body, config);

export const isAuthenticated = () => {
    return AsyncStorage.getItem('token') !== null;
}

export const getToken = () => {
    return AsyncStorage.getItem('token');
}
