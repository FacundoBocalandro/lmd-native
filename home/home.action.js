export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST'
export const GET_USER_DATA_RESPONSE = 'GET_USER_DATA_RESPONSE'
export const GET_USER_DATA_ERROR = 'GET_USER_DATA_ERROR'

const homeActions = {
    getUserData: {
        request: () => ({type: GET_USER_DATA_REQUEST}),
        response: (res) => ({type: GET_USER_DATA_RESPONSE, res}),
        error: (err) => ({type: GET_USER_DATA_ERROR, err}),
    }
}

export default homeActions;
