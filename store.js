import {createStore} from "redux";
import rootReducer from "./reducers";
import {compose} from "redux";
import {applyMiddleware} from "redux";
import sessionMiddleware from "./session/session.middleware";
import vaccinesMiddleware from "./vaccines/vaccinesMiddleware";
import graphMiddleware from "./graph/graph.middleware";
import homeMiddleware from "./home/home.middleware";
import readingsMiddleware from "./readings/reasing.middleware";

const store = createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(
        sessionMiddleware,
        graphMiddleware,
        homeMiddleware,
        vaccinesMiddleware,
        readingsMiddleware
    ))
)

export default store;
