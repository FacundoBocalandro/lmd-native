import {GET_ALL_CATEGORIES_RESPONSE, GET_CATEGORY_READINGS_RESPONSE} from "./reading.actions";

const initialState = {
    allCategories: undefined,
    categoryReadings: undefined,
}
const readingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_RESPONSE:
            return {...state, allCategories: action.res}
        case GET_CATEGORY_READINGS_RESPONSE:
            return {...state, categoryReadings: action.res}
        default:
            return state;
    }
}

export default readingsReducer;
