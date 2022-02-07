import {services} from "./notes.services";
import {
    CREATE_NOTE_REQUEST,
    DELETE_NOTE_REQUEST,
    GET_ALL_NOTES_REQUEST
} from "./notes.actions";
import actions from "../actions";

const notesMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_ALL_NOTES_REQUEST:
            services.getAllNotes()
                .then(res => dispatch(actions.notes.getAllNotes.response(res)));
            break;
        case CREATE_NOTE_REQUEST:
            services.createNote({title: "", body: ""})
                .then(res => {
                    if (action.callback) action.callback(res);
                    dispatch(actions.notes.createNote.response(res));
                })
                .catch(err => dispatch(actions.notes.createNote.error(err)));
            break;
        case DELETE_NOTE_REQUEST:
            services.deleteNote(action.id)
                .then(res => dispatch(actions.notes.deleteNote.response(res)));
            break;
        default:
            break;
    }
}

export default notesMiddleware;
