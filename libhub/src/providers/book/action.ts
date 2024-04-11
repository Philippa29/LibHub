import { createAction } from "redux-actions";
import { Book } from "./interface";

export enum ActionTypes {
    CREATE_BOOK = 'CREATE_BOOK',
    DELETE_BOOK = 'DELETE_BOOK',
    UPDATE_BOOK = 'UPDATE_BOOK',
    GET_CATEGORY = 'GET_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY', 
    GET_ALL_BOOKS = 'GET_ALL_BOOKS',
    GET_BOOK_BY_ID = 'GET_BOOK_BY_ID',
    GET_ALL_IMAGES = 'GET_ALL_IMAGES',
    SEARCH_AUTHOR = 'SEARCH_AUTHOR',
    SEARCH_TITLE = 'SEARCH_TITLE',
    SEARCH_ISBN = 'SEARCH_ISBN',
    BOOK_COUNT = 'BOOK_COUNT',
    GET_BOOK = "GET_BOOK",
   
}


export const createBookAction = createAction<Book,Book>(ActionTypes.CREATE_BOOK,p=>p);
export const getCategory = createAction(ActionTypes.GET_CATEGORY);
export const getAllBookAction = createAction<Book[], Book[]>(ActionTypes.GET_ALL_BOOKS, p=>p);
export const updateBookAction = createAction<Book,Book>(ActionTypes.UPDATE_BOOK, p=>p);
export const deleteBookAction = createAction<string>(ActionTypes.DELETE_BOOK);
export const countBook = createAction(ActionTypes.BOOK_COUNT);
export const getbookbyid = createAction(ActionTypes.GET_BOOK_BY_ID);




