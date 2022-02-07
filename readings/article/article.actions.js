export const GET_ARTICLE_REQUEST = "GET_ARTICLE_REQUEST";
export const GET_ARTICLE_RESPONSE = "GET_ARTICLE_RESPONSE";
export const GET_ARTICLE_ERROR = "GET_ARTICLE_ERROR";
export const SET_ARTICLE_ID_REQUEST = "SET_ARTICLE_ID_REQUEST";

const articleActions = {
    setArticleId: {
        request: (id) => ({type: SET_ARTICLE_ID_REQUEST, id})
    }
}

export default articleActions;
