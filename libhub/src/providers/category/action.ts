import { createAction } from "redux-actions";
import { Category } from "./interface";

export enum ActionTypes {
    CREATE_CATEGORY = 'CREATE_CATEGORY',
    GET_CATEGORY ='GET_CATEGORY'
}

export const createCategoryAction = createAction<Category, Category> (ActionTypes.CREATE_CATEGORY, p=>p);
export const getCategoryAction = createAction<Category , Category> (ActionTypes.GET_CATEGORY, p=>p);