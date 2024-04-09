import { createAction } from "redux-actions";

enum ActionTypes {
    GET_ALL_USERS = 'GET_ALL_USERS',
    GET_USER_BY_ID = 'GET_USER_BY_ID',
    GET_USER_COUNT = 'GET_USER_COUNT',
    GET_USER_BOOKREQUEST = 'GET_USER_BOOKREQUEST',
    GET_USER_LOANS = 'GET_USER_LOANS',
} 


export const getAllUsers = createAction(ActionTypes.GET_ALL_USERS);
export const getUserById = createAction(ActionTypes.GET_USER_BY_ID);
export const getUserCount = createAction(ActionTypes.GET_USER_COUNT);
