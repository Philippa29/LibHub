import { createAction } from "redux-actions";

enum ActionTypes {
    CREATE_BOOK = 'CREATE_BOOK',
    DELETE_BOOK = 'DELETE_BOOK',
    UPDATE_BOOK = 'UPDATE_BOOK',
    GET_CATEGORY = 'GET_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY', 
    GET_BOOk = 'GET_ALL_BOOKS',
}


export const createBook = createAction(ActionTypes.CREATE_BOOK);
export const getCategory = createAction(ActionTypes.GET_CATEGORY);
export const getBook = createAction(ActionTypes.GET_BOOk);
