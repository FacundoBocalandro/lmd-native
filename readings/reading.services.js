import {get} from "../utils/http";

export const services = {
    getAllCategories: () => get('readings/category'),
    getAllReadingsForCategory: (category) => get(`readings/category/${category}`)
}
