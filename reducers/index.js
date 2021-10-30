import sessionReducer from "../session/session.reducer";
import {combineReducers} from "redux";
import {LOGOUT} from "../session/session.actions";
import graphReducer from "../graph/graph.reducer";
import homeReducer from "../home/home.reducer"
import vaccinesReducer from "../vaccines/vaccinesReducer";
import vaccineInfoReducer from "../vaccines/vaccineInfo/vaccineInfo.reducer";
import readingsReducer from "../readings/readings.reducer";
import articleReducer from "../readings/article/article.reducer";
import notesReducer from "../notes/notes.reducer";
import noteReducer from "../notes/note/note.reducer";
import relationshipsReducer from "../relation/relationship.reducer";
import prenatalProfileReducer from "../prenatalProfile/prenatalProfile.reducer";

const appReducer = combineReducers({
    session: sessionReducer,
    home: homeReducer,
    graph: graphReducer,
    vaccines: vaccinesReducer,
    notes: notesReducer,
    note: noteReducer,
    vaccineInfo: vaccineInfoReducer,
    readings: readingsReducer,
    articleInfo: articleReducer,
    relationships: relationshipsReducer,
    prenatalProfile: prenatalProfileReducer
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export default rootReducer;
