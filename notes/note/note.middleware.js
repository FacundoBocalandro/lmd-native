import {services} from "../notes.services";
import {
    UPDATE_NOTE_BODY_REQUEST,
    UPDATE_NOTE_TITLE_REQUEST
} from "./note.actions";
import actions from "../../actions";

const noteMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case UPDATE_NOTE_TITLE_REQUEST:
            if (action.sendToServer) {
                const note = getState().note.note;
                console.log("note del middleware", note)
                services.updateNote(note)
                    .then(res => dispatch(actions.note.updateNoteTitle.response(res)))
                    .catch(err => dispatch(actions.note.updateNoteTitle.error(err)));
            }
            break;
        case UPDATE_NOTE_BODY_REQUEST:
            if (action.sendToServer) {
                const note = getState().note.note;
                services.updateNote({...note, body: action.body})
                    .then(res => dispatch(actions.note.updateNoteBody.response(res)))
                    .catch(err => dispatch(actions.note.updateNoteBody.error(err)));
            }
            break;
        default:
            break;
    }
}

export default noteMiddleware;
