import {GET_ALL_VACCINE_RESPONSE, GET_USERS_VACCINE_RESPONSE} from "./vaccine.actions";

const initialState = {
    usersVaccines: undefined,
    allVaccines: undefined
}
const vaccineReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_VACCINE_RESPONSE:
            return {
                ...state,
                usersVaccines: action.vaccineApplications
            }
        case GET_ALL_VACCINE_RESPONSE:
            return {
                ...state,
                allVaccines: action.res
            }
        default:
            return state
    }
}

export default vaccineReducer;
