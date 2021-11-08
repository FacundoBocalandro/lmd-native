import actions from "../../actions";
import {connect} from "react-redux";
import ArticleScreen from "../components/ArticleScreen";

const mapStateToProps = state => ({
    articleId: state.articleInfo.articleId,
    article: state.articleInfo.article
})

const mapDispatchToProps = dispatch => ({
    getArticle: (id) => dispatch(actions.article.getArticle.request(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen);

