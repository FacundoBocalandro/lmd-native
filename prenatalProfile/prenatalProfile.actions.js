export const GET_PRENATAL_DATA_REQUEST = "GET_PRENATAL_DATA_REQUEST";
export const GET_PRENATAL_DATA_RESPONSE = "GET_PRENATAL_DATA_RESPONSE";
export const GET_PRENATAL_DATA_ERROR = "GET_PRENATAL_DATA_ERROR";

const prenatalProfileActions = {
    getPrenatalData: {
        request: () => ({type: GET_PRENATAL_DATA_REQUEST}),
        response: (res) => ({type: GET_PRENATAL_DATA_RESPONSE, res}),
        error: (err) => ({type: GET_PRENATAL_DATA_ERROR, err})
    },
}

export default prenatalProfileActions;

