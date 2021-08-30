export const GET_ALL_NOTES_REQUEST = "GET_ALL_NOTES_REQUEST";
export const GET_ALL_NOTES_RESPONSE = "GET_ALL_NOTES_RESPONSE";
export const CREATE_NOTE_REQUEST = "CREATE_NOTE_REQUEST";
export const CREATE_NOTE_RESPONSE = "CREATE_NOTE_RESPONSE";
export const CREATE_NOTE_ERROR = "CREATE_NOTE_ERROR";
export const DELETE_NOTE_REQUEST = "DELETE_NOTE_REQUEST";
export const DELETE_NOTE_RESPONSE = "DELETE_NOTE_RESPONSE";

const notesActions = {
    getAllNotes: {
        request: () => ({type: GET_ALL_NOTES_REQUEST}),
        response: (res) => ({type: GET_ALL_NOTES_RESPONSE, res})
    },
    createNote: {
        request: (callback) => ({type: CREATE_NOTE_REQUEST, callback}),
        response: (res) => ({type: CREATE_NOTE_RESPONSE, res}),
        error: (err) => ({type: CREATE_NOTE_ERROR, err})
    },
    deleteNote: {
        request: (id) => ({type: DELETE_NOTE_REQUEST, id}),
        response: (res) => ({type: DELETE_NOTE_RESPONSE, res}),
    }

}

export default notesActions;
