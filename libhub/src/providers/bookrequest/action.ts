import { createAction } from "redux-actions";
import { IBookRequest } from "./context";

export enum ActionTypes{
    CREATE_BOOKREQUEST = 'CREATE_BOOKREQUEST',
    DELETE_BOOKREQUEST = 'DELETE_BOOKREQUEST',
    UPDATE_BOOKREQUEST = 'UPDATE_BOOKREQUEST',
    GET_BOOKREQUEST = 'GET_BOOKREQUEST',
    BOOKREQUEST_COUNT = 'BOOKREQUEST_COUNT',
}


export const createBookRequestAction= createAction<IBookRequest, IBookRequest>(ActionTypes.CREATE_BOOKREQUEST, p => p);
export const getBookRequestAction = createAction<IBookRequest, IBookRequest>(ActionTypes.GET_BOOKREQUEST, p => p);
export const updateBookRequestAction = createAction<string>(ActionTypes.UPDATE_BOOKREQUEST);

