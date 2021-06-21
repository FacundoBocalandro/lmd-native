import {createStore} from "redux";
import rootReducer from "./reducers";
import {compose} from "redux";
import {applyMiddleware} from "redux";
import sessionMiddleware from "./session/session.middleware";
import graphMiddleware from "./graph/graph.middleware";
import homeMiddleware from "./home/home.middleware";

const store = createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(
        sessionMiddleware,
        graphMiddleware,
        homeMiddleware
    ))
)

export default store;
