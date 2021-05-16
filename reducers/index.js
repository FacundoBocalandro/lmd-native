import sessionReducer from "../session/session.reducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    session: sessionReducer,
});

export default rootReducer;
