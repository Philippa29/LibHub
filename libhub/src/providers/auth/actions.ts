import { createAction } from 'redux-actions';


enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTER = 'REGISTER'
}

export const login = createAction<string>(ActionTypes.LOGIN);
export const logout = createAction(ActionTypes.LOGOUT);
export const register = createAction<string>(ActionTypes.REGISTER);


