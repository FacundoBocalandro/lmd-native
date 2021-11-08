import {
    CREATE_NOTE_ERROR,
    CREATE_NOTE_REQUEST,
    CREATE_NOTE_RESPONSE,
    DELETE_NOTE_REQUEST,
    GET_ALL_NOTES_RESPONSE,
} from "./notes.actions";
import {UPDATE_NOTE_STATUS} from "../constants/notes";

const initialState = {
    allNotes: [],
    updateNoteStatus: UPDATE_NOTE_STATUS.SAVED,
    createNotePending: false
}

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NOTES_RESPONSE:
            return {
                ...state,
                allNotes: action.res
            }
        case CREATE_NOTE_REQUEST:
            return {
                ...state,
                createNotePending: true
            }
        case CREATE_NOTE_RESPONSE:
            return {
                ...state,
                allNotes: [action.res, ...state.allNotes],
                createNotePending: false
            }
        case CREATE_NOTE_ERROR:
            return {
                ...state,
                createNotePending: false
            }
        case DELETE_NOTE_REQUEST:
            return {
                ...state,
                allNotes: state.allNotes.filter(note => note.id !== action.id)
            }
        default:
            return state
    }
}

export default notesReducer;
