import sessionActions from "../session/session.actions";
import graphActions from "../graph/graph.action";
import homeActions from "../home/home.action";
import vaccinesActions from "../vaccines/vaccines.actions";
import vaccineInfoActions from "../vaccines/vaccineInfo/vaccineInfo.actions";
import readingsActions from "../readings/reading.actions";
import articleActions from "../readings/article/article.actions";
import notesActions from "../notes/notes.actions";
import noteActions from "../notes/note/note.actions";
import relationshipsActions from "../relation/relationship.actions";
import settingsActions from "../settings/settings.actions";

const actions = {
    session: sessionActions,
    graph: graphActions,
    home: homeActions,
    vaccines: vaccinesActions,
    notes: notesActions,
    note: noteActions,
    vaccineInfo:  vaccineInfoActions,
    readings: readingsActions,
    article: articleActions,
    relationships: relationshipsActions,
    settings: settingsActions
}

export default actions;
