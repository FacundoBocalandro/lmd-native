import {GET_USER_DATA_ERROR, GET_USER_DATA_REQUEST, GET_USER_DATA_RESPONSE} from "./home.action";


const initialState = {
    user: undefined
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA_REQUEST:
        case GET_USER_DATA_RESPONSE:
            return {...state, user: action.res}
        case GET_USER_DATA_ERROR:
        default:
            return state
    }
}
export default homeReducer;
