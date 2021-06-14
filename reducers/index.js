import sessionReducer from "../session/session.reducer";
import {combineReducers} from "redux";
import {LOGOUT} from "../session/session.actions";
import vaccineReducer from "../vaccines/vaccine.reducer";

const appReducer = combineReducers({
    session: sessionReducer,
    vaccine: vaccineReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
