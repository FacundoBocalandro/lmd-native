import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentUserToken} from "./tokens";
import messaging from "@react-native-firebase/messaging";

const httpClient = axios.create();
httpClient.defaults.timeout = 1200000;

const baseUrl = "http://localhost:8080/"

const _request = async (url, method, data, config = {}) => {
    // const headers = isAuthenticated() || config.token ? {...config.headers, Authorization: `Bearer ${config.token ?? await getToken()}`} : config.headers;
    const headers = await isAuthenticated() || config.token ? {...config.headers, Authorization: `Bearer ${config.token ?? await getCurrentUserToken()}`} : config.headers;

    return httpClient({
        url: baseUrl + url,
        method,
        data,
        headers, ...config.options
    }).then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 204) return res.data;
        else throw (res.data);
    // }).catch(async errorResponse => {
    }).catch(errorResponse => {
        // JWT expired: logout
        if (!config.noAuth && errorResponse.response?.status === 403) {
            // await removeCurrentToken();
            // window.location.href = window.location.origin
            AsyncStorage.removeItem('token');
            messaging().unsubscribeFromTopic("Global");
            messaging().getToken().then(token => deleteRequest('users/removetoken', {token}));
        }
        else throw (errorResponse.response || {status: 500})
    })
}

export const get = (url, config) => _request(url, "GET", null, config);
export const post = (url, body, config = {}) => _request(url, "POST", body, config);
export const put = (url, body, config = {}) => _request(url, "PUT", body, config);
export const patch = (url, body, config = {}) => _request(url, "PATCH", body, config);
export const deleteRequest = (url, body, config = {}) => _request(url, "DELETE", body, config);


export const isAuthenticated = async () => {
    return await AsyncStorage.getItem('selected-user') !== null;
}

export const getToken = async () => {
    // return await AsyncStorage.getItem(`token-${await AsyncStorage.getItem('selected-user')}`);
    return await AsyncStorage.getItem('token');
}
