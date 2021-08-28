import {
    GET_VACCINE_DETAILS_RESPONSE,
    GET_VACCINE_DETAILS_ERROR, SET_VACCINE_ID_REQUEST
} from "./vaccineInfo.actions";

const initialState = {
    vaccineDetails: undefined,
    vaccineId: undefined,
}
const vaccineInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VACCINE_DETAILS_RESPONSE:
            return {...state, vaccineDetails: action.res}
        case GET_VACCINE_DETAILS_ERROR:
            return {...state, vaccineDetails: initialState.vaccineDetails}
        case SET_VACCINE_ID_REQUEST:
            return {...state, vaccineId: action.id}
        default:
            return state;
    }
}

export default vaccineInfoReducer;
