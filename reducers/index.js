import sessionReducer from "../session/session.reducer";
import {combineReducers} from "redux";
import {LOGOUT} from "../session/session.actions";
import graphReducer from "../graph/graph.reducer";
import homeReducer from "../home/home.reducer"
import vaccinesReducer from "../vaccines/vaccinesReducer";
import vaccineInfoReducer from "../vaccines/vaccineInfo/vaccineInfo.reducer";

const appReducer = combineReducers({
    session: sessionReducer,
    home: homeReducer,
    graph: graphReducer,
    vaccines: vaccinesReducer,
    vaccineInfo: vaccineInfoReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
