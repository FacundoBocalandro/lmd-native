import sessionActions from "../session/session.actions";
import graphActions from "../graph/graph.action";
import homeActions from "../home/home.action";
import vaccinesActions from "../vaccines/vaccines.actions";
import vaccineInfoActions from "../vaccines/vaccineInfo/vaccineInfo.actions";
import readingsActions from "../readings/reading.actions";
import articleActions from "../readings/article/article.actions";

const actions = {
    session: sessionActions,
    graph: graphActions,
    home: homeActions,
    vaccines: vaccinesActions,
    vaccineInfo:  vaccineInfoActions,
    readings: readingsActions,
    article: articleActions
}

export default actions;
