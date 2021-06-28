export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST'
export const GET_USER_DATA_RESPONSE = 'GET_USER_DATA_RESPONSE'
export const GET_USER_DATA_ERROR = 'GET_USER_DATA_ERROR'
export const GET_USER_INFO_FROM_TOKEN_REQUEST = "GET_USER_INFO_FROM_TOKEN_REQUEST";
export const GET_USER_INFO_FROM_TOKEN_RESPONSE = "GET_USER_INFO_FROM_TOKEN_RESPONSE";
export const GET_USER_INFO_FROM_TOKEN_ERROR = "GET_USER_INFO_FROM_TOKEN_ERROR";

const homeActions = {
    getUserData: {
        request: () => ({type: GET_USER_DATA_REQUEST}),
        response: (res) => ({type: GET_USER_DATA_RESPONSE, res}),
        error: (err) => ({type: GET_USER_DATA_ERROR, err}),
    },
    getUserInfoFromToken: {
        request: (token) => ({type: GET_USER_INFO_FROM_TOKEN_REQUEST, token}),
        response: (token, res) => ({type: GET_USER_INFO_FROM_TOKEN_RESPONSE, token, res}),
        error: (err) => ({type: GET_USER_INFO_FROM_TOKEN_ERROR, err}),
    }
}

export default homeActions;
