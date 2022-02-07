import {
    ADD_APPLIED_VACCINE_REQUEST,
    ADD_APPLIED_VACCINE_RESPONSE,
    ADD_APPLIED_VACCINE_ERROR,
    GET_ALL_VACCINES_RESPONSE,
    GET_USER_VACCINES_RESPONSE
} from "./vaccines.actions";

const initialState = {
    usersVaccines: undefined,
    allVaccines: undefined,
    loading: false
}
const vaccinesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VACCINES_RESPONSE:
            return {...state, allVaccines: action.res}
        case GET_USER_VACCINES_RESPONSE:
            return {...state, userVaccines: action.res}
        case ADD_APPLIED_VACCINE_REQUEST:
            return {...state, loading: true}
        case ADD_APPLIED_VACCINE_RESPONSE:
        case ADD_APPLIED_VACCINE_ERROR:
            return {...state, loading: false}
        default:
            return state;
    }
}

export default vaccinesReducer;
