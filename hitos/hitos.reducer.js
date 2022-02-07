import {GET_HITOS_RESPONSE} from "./hitos.actions";

const initialState = {
    hitos: undefined,
}
const hitosReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HITOS_RESPONSE:
            return {...state, hitos: action.res}
        default:
            return state;
    }
}

export default hitosReducer;
