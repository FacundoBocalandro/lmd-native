import sessionReducer from "../session/session.reducer";
import {combineReducers} from "redux";
import {LOGOUT} from "../session/session.actions";
import vaccinesReducer from "../vaccines/vaccinesReducer";

const appReducer = combineReducers({
    session: sessionReducer,
    vaccines: vaccinesReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
