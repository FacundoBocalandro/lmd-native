import sessionActions from "../session/session.actions";
import graphActions from "../graph/graph.action";
import homeActions from "../home/home.action";
import vaccinesActions from "../vaccines/vaccines.actions";

const actions = {
    session: sessionActions,
    graph: graphActions,
    home: homeActions,
    vaccines: vaccinesActions,
}

export default actions;
