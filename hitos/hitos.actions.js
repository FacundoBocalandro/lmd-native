export const GET_HITOS_REQUEST = "GET_HITOS_REQUEST";
export const GET_HITOS_RESPONSE = "GET_HITOS_RESPONSE";
export const GET_HITOS_ERROR = "GET_HITOS_ERROR";

const hitosActions = {
    getHitos: {
        request: () => ({type: GET_HITOS_REQUEST}),
        response: (res) => ({type: GET_HITOS_RESPONSE, res}),
        error: (err) => ({type: GET_HITOS_ERROR, err}),
    },
}

export default hitosActions;
