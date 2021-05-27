import sessionReducer from "../session/session.reducer";
import {combineReducers} from "redux";

const appReducer = combineReducers({
    session: sessionReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
