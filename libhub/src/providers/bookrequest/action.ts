import { createAction } from "redux-actions";


enum ActionTypes{
    CREATE_BOOKREQUEST = 'CREATE_BOOKREQUEST',
    DELETE_BOOKREQUEST = 'DELETE_BOOKREQUEST',
    UPDATE_BOOKREQUEST = 'UPDATE_BOOKREQUEST',
    GET_BOOKREQUEST = 'GET_BOOKREQUEST',
    BOOKREQUEST_COUNT = 'BOOKREQUEST_COUNT',
}


export const createBookRequest = createAction(ActionTypes.CREATE_BOOKREQUEST);
export const getBookRequest = createAction(ActionTypes.GET_BOOKREQUEST);
export const updateBookRequest = createAction(ActionTypes.UPDATE_BOOKREQUEST);
