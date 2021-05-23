import {createStore} from "redux";
import rootReducer from "./reducers";
import {compose} from "redux";
import {applyMiddleware} from "redux";
import sessionMiddleware from "./session/session.middleware";

const store = createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(
        sessionMiddleware,
    ))
)

export default store;
