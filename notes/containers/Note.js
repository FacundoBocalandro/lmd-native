import {connect} from "react-redux";
import actions from "../../actions";
import Note from "../components/Note";

const mapStateToProps = state => ({
    note: state.note.note,
    updateNoteStatus: state.note.updateNoteStatus,
    createNotePending: state.note.createNotePending
})

const mapDispatchToProps = dispatch => ({
    updateNoteTitle: (id, title, sendToServer) => dispatch(actions.note.updateNoteTitle.request(id, title, sendToServer)),
    updateNoteBody: (id, body, sendToServer) => dispatch(actions.note.updateNoteBody.request(id, body, sendToServer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Note);
