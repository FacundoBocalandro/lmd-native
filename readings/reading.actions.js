export const GET_ALL_CATEGORIES_REQUEST = "GET_ALL_CATEGORIES_REQUEST";
export const GET_ALL_CATEGORIES_RESPONSE = "GET_ALL_CATEGORIES_RESPONSE";
export const GET_ALL_CATEGORIES_ERROR = "GET_ALL_CATEGORIES_ERROR";
export const GET_CATEGORY_READINGS_REQUEST = "GET_CATEGORY_READINGS_REQUEST";
export const GET_CATEGORY_READINGS_RESPONSE = "GET_CATEGORY_READINGS_RESPONSE";
export const GET_CATEGORY_READINGS_ERROR = "GET_CATEGORY_READINGS_ERROR";

const readingsActions = {
    getAllCategories: {
        request: () => ({type: GET_ALL_CATEGORIES_REQUEST}),
        response: (res) => ({type: GET_ALL_CATEGORIES_RESPONSE, res}),
        error: (err) => ({type: GET_ALL_CATEGORIES_ERROR, err}),
    },
    getAllReadingsForCategory: {
        request: (category) => ({type: GET_CATEGORY_READINGS_REQUEST, category}),
        response: (res) => ({type: GET_CATEGORY_READINGS_RESPONSE, res}),
        error: (err) => ({type: GET_CATEGORY_READINGS_ERROR, err}),
    }
}

export default readingsActions;
