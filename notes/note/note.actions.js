export const UPDATE_NOTE_TITLE_REQUEST = "UPDATE_NOTE_TITLE_REQUEST";
export const UPDATE_NOTE_TITLE_RESPONSE = "UPDATE_NOTE_TITLE_RESPONSE";
export const UPDATE_NOTE_TITLE_ERROR = "UPDATE_NOTE_TITLE_ERROR";
export const UPDATE_NOTE_BODY_REQUEST = "UPDATE_NOTE_BODY_REQUEST";
export const UPDATE_NOTE_BODY_RESPONSE = "UPDATE_NOTE_BODY_RESPONSE";
export const UPDATE_NOTE_BODY_ERROR = "UPDATE_NOTE_BODY_ERROR";
export const SET_SELECTED_NOTE = "SET_SELECTED_NOTE";

const noteActions = {
    updateNoteTitle: {
        request: (id, title, sendToServer) => ({type: UPDATE_NOTE_TITLE_REQUEST, id, title, sendToServer}),
        response: (res) => ({type: UPDATE_NOTE_TITLE_RESPONSE, res}),
        error: (err) => ({type: UPDATE_NOTE_TITLE_ERROR, err})
    },
    updateNoteBody: {
        request: (id, body, sendToServer) => ({type: UPDATE_NOTE_BODY_REQUEST, id, body, sendToServer}),
        response: (res) => ({type: UPDATE_NOTE_BODY_RESPONSE, res}),
        error: (err) => ({type: UPDATE_NOTE_BODY_ERROR, err})
    },
    setSelectedNote: {
        request: (note) => ({type: SET_SELECTED_NOTE, note}),
    }

}

export default noteActions;
