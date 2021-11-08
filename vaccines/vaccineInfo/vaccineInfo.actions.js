export const GET_VACCINE_DETAILS_REQUEST = "GET_VACCINE_DETAILS_REQUEST";
export const GET_VACCINE_DETAILS_RESPONSE = "GET_VACCINE_DETAILS_RESPONSE";
export const GET_VACCINE_DETAILS_ERROR = "GET_VACCINE_DETAILS_ERROR";
export const SET_VACCINE_ID_REQUEST = "SET_VACCINE_ID_REQUEST";

const vaccineInfoActions = {
    getVaccineDetails: {
        request: (id) => ({type: GET_VACCINE_DETAILS_REQUEST, id}),
        response: (res) => ({type: GET_VACCINE_DETAILS_RESPONSE, res}),
        error: (err) => ({type: GET_VACCINE_DETAILS_ERROR, err})
    },
    setVaccineId: {
        request: (id) => ({type: SET_VACCINE_ID_REQUEST, id})
    }
}

export default vaccineInfoActions;
