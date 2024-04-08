import { createAction } from "redux-actions";

enum ActionTypes {
    CREATE_BOOK = 'CREATE_BOOK',
    DELETE_BOOK = 'DELETE_BOOK',
    UPDATE_BOOK = 'UPDATE_BOOK',
    GET_CATEGORY = 'GET_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY', 
    GET_BOOk = 'GET_ALL_BOOKS',
    GET_BOOK_BY_ID = 'GET_BOOK_BY_ID',
    GET_ALL_IMAGES = 'GET_ALL_IMAGES',
    SEARCH_AUTHOR = 'SEARCH_AUTHOR',
    SEARCH_TITLE = 'SEARCH_TITLE',
    SEARCH_ISBN = 'SEARCH_ISBN',
    SEARCH_CATEGORY = 'SEARCH_CATEGORY',
    BOOK_COUNT = 'BOOK_COUNT',
}


export const createBook = createAction(ActionTypes.CREATE_BOOK);
export const getCategory = createAction(ActionTypes.GET_CATEGORY);
export const getBook = createAction(ActionTypes.GET_BOOk);
export const updateBook = createAction(ActionTypes.UPDATE_BOOK);
export const deleteBook = createAction(ActionTypes.DELETE_BOOK);
export const countBook = createAction(ActionTypes.BOOK_COUNT);
export const getbookbyid = createAction(ActionTypes.GET_BOOK_BY_ID);
export const getImage = createAction(ActionTypes.GET_ALL_IMAGES);

export const searchAuthor = createAction(ActionTypes.SEARCH_AUTHOR);
export const searchTitle = createAction(ActionTypes.SEARCH_TITLE);
export const searchIsbn = createAction(ActionTypes.SEARCH_ISBN);
export const searchCategory = createAction(ActionTypes.SEARCH_CATEGORY);
export const addCategory = createAction(ActionTypes.UPDATE_CATEGORY);


