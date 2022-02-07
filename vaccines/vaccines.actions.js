export const GET_ALL_VACCINES_REQUEST = "GET_ALL_VACCINES_REQUEST";
export const GET_ALL_VACCINES_RESPONSE = "GET_ALL_VACCINES_RESPONSE";
export const GET_ALL_VACCINES_ERROR = "GET_ALL_VACCINES_ERROR";
export const GET_USER_VACCINES_REQUEST = "GET_USER_VACCINES_REQUEST";
export const GET_USER_VACCINES_RESPONSE = "GET_USER_VACCINES_RESPONSE";
export const GET_USER_VACCINES_ERROR = "GET_USER_VACCINES_ERROR";
export const ADD_APPLIED_VACCINE_REQUEST = "ADD_APPLIED_VACCINE_REQUEST";
export const ADD_APPLIED_VACCINE_RESPONSE = "ADD_APPLIED_VACCINE_RESPONSE";
export const ADD_APPLIED_VACCINE_ERROR = "ADD_APPLIED_VACCINE_ERROR";

const vaccinesActions = {
    getAllVaccines: {
        request: () => ({type: GET_ALL_VACCINES_REQUEST}),
        response: (res) => ({type: GET_ALL_VACCINES_RESPONSE, res}),
        error: (err) => ({type: GET_ALL_VACCINES_ERROR, err}),
    },
    getUserVaccines: {
        request: () => ({type: GET_USER_VACCINES_REQUEST}),
        response: (res) => ({type: GET_USER_VACCINES_RESPONSE, res}),
        error: (err) => ({type: GET_USER_VACCINES_ERROR, err}),
    },
    addAppliedVaccine: {
        request: (vaccineData, callback, errorCallback) => ({type: ADD_APPLIED_VACCINE_REQUEST, vaccineData, callback, errorCallback}),
        response: (res) => ({type: ADD_APPLIED_VACCINE_RESPONSE, res}),
        error: (err) => ({type: ADD_APPLIED_VACCINE_ERROR, err}),
    }
}

export default vaccinesActions
