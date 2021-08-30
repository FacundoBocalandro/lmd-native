import sessionActions from "../session/session.actions";
import graphActions from "../graph/graph.action";
import homeActions from "../home/home.action";
import vaccinesActions from "../vaccines/vaccines.actions";
import notesActions from "../notes/notes.actions";
import noteActions from "../notes/note/note.actions";

const actions = {
    session: sessionActions,
    graph: graphActions,
    home: homeActions,
    vaccines: vaccinesActions,
    notes: notesActions,
    note: noteActions
}

export default actions;
