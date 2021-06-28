import {GET_USER_DATA_ERROR, GET_USER_DATA_REQUEST, GET_USER_DATA_RESPONSE} from "./home.action";
import {GET_USER_INFO_FROM_TOKEN_RESPONSE} from "../session/session.actions";


const initialState = {
    allUsersInfo: undefined,
    user: undefined
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA_REQUEST:
        case GET_USER_DATA_RESPONSE:
            return {...state, user: action.res}
        case GET_USER_DATA_ERROR:
        case GET_USER_INFO_FROM_TOKEN_RESPONSE:
            return {...state, allUsersInfo: {...state.allUsersInfo, [action.token]: action.res}}
        default:
            return state
    }
}
export default homeReducer;
