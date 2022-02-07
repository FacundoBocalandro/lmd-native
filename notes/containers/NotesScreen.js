import {connect} from "react-redux";
import NotesScreen from "../components/NotesScreen";
import actions from "../../actions";

const mapStateToProps = state => ({
    allNotes: state.notes.allNotes,
    updateNoteStatus: state.notes.updateNoteStatus,
    createNotePending: state.notes.createNotePending
})

const mapDispatchToProps = dispatch => ({
    getAllNotes: () => dispatch(actions.notes.getAllNotes.request()),
    createNote: (callback) => dispatch(actions.notes.createNote.request(callback)),
    deleteNote: (id) => dispatch(actions.notes.deleteNote.request(id)),
    setSelectedNote: (note) => dispatch(actions.note.setSelectedNote.request(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotesScreen);
