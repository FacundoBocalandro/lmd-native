import {
    GET_PRENATAL_DATA_RESPONSE
} from "./prenatalProfile.actions";

const initialState = {
    data: undefined,
}

const prenatalProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRENATAL_DATA_RESPONSE:
            return {...state,
                data: action.res}
        default:
            return state
    }
}

export default prenatalProfileReducer;
