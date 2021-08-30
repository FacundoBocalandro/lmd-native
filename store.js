import {createStore} from "redux";
import rootReducer from "./reducers";
import {compose} from "redux";
import {applyMiddleware} from "redux";
import sessionMiddleware from "./session/session.middleware";
import vaccinesMiddleware from "./vaccines/vaccinesMiddleware";
import graphMiddleware from "./graph/graph.middleware";
import homeMiddleware from "./home/home.middleware";
import notesMiddleware from "./notes/notes.middleware";
import noteMiddleware from "./notes/note/note.middleware";

const store = createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(
        sessionMiddleware,
        graphMiddleware,
        homeMiddleware,
        vaccinesMiddleware,
        notesMiddleware,
        noteMiddleware
    ))
)

export default store;
