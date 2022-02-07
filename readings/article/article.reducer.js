import {
    GET_ARTICLE_RESPONSE,
    GET_ARTICLE_ERROR, SET_ARTICLE_ID_REQUEST
} from "./article.actions";

const initialState = {
    article: undefined,
}
const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTICLE_ID_REQUEST:
            return {...state, article: action.id}
        default:
            return state;
    }
}

export default articleReducer;
