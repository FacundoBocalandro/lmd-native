import {
    SET_SELECTED_NOTE, UPDATE_NOTE_BODY_ERROR,
    UPDATE_NOTE_BODY_REQUEST,
    UPDATE_NOTE_BODY_RESPONSE, UPDATE_NOTE_TITLE_ERROR,
    UPDATE_NOTE_TITLE_REQUEST,
    UPDATE_NOTE_TITLE_RESPONSE

} from "./note.actions";
import {UPDATE_NOTE_STATUS} from "../../constants/notes";

const initialState = {
    note: undefined,
    updateNoteStatus: UPDATE_NOTE_STATUS.SAVED,
}

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NOTE_TITLE_REQUEST:
            return {
                ...state,
                note: {...state.note, title: action.title},
                updateNoteStatus: UPDATE_NOTE_STATUS.SAVING
            }
        case UPDATE_NOTE_BODY_REQUEST:
            return {
                ...state,
                note: {...state.note, body: action.body},
                updateNoteStatus: UPDATE_NOTE_STATUS.SAVING
            }
        case UPDATE_NOTE_TITLE_RESPONSE:
        case UPDATE_NOTE_BODY_RESPONSE:
            return {
                ...state,
                updateNoteStatus: UPDATE_NOTE_STATUS.SAVED
            }
        case UPDATE_NOTE_TITLE_ERROR:
        case UPDATE_NOTE_BODY_ERROR:
            return {
                ...state,
                updateNoteStatus: UPDATE_NOTE_STATUS.ERROR
            }
        case SET_SELECTED_NOTE:
            return {
                ...state,
                note: action.note
            }
        default:
            return state
    }
}

export default noteReducer;
