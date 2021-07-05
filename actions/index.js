import sessionActions from "../session/session.actions";
import graphActions from "../graph/graph.action";
import homeActions from "../home/home.action";
import vaccinesActions from "../vaccines/vaccines.actions";
import vaccineInfoActions from "../vaccines/vaccineInfo/vaccineInfo.actions";

const actions = {
    session: sessionActions,
    graph: graphActions,
    home: homeActions,
    vaccines: vaccinesActions,
    vaccineInfo:  vaccineInfoActions
}

export default actions;
