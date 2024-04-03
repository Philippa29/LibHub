import { createAction } from "redux-actions";

enum ActionTypes {
    CREATE_BOOK = 'CREATE_BOOK',
    DELETE_BOOK = 'DELETE_BOOK',
    UPDATE_BOOK = 'UPDATE_BOOK',
    GET_CATEGORY = 'GET_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY', 
    GET_BOOk = 'GET_ALL_BOOKS',
    GET_BOOK_BY_ID = 'GET_BOOK_BY_ID',
}


export const createBook = createAction(ActionTypes.CREATE_BOOK);
export const getCategory = createAction(ActionTypes.GET_CATEGORY);
export const getBook = createAction(ActionTypes.GET_BOOk);
export const updateBook = createAction(ActionTypes.UPDATE_BOOK);
export const deleteBook = createAction(ActionTypes.DELETE_BOOK);
export const getbookbyid = createAction(ActionTypes.GET_BOOK_BY_ID);
