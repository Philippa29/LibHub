
import { createAction } from 'redux-actions';


// Define action types
enum ActionTypes {
    REGISTER = 'REGISTER',
 
  
}

// Define action creators
//export const login = createAction<string>(ActionTypes.LOGIN);

export const registeruser = createAction(ActionTypes.REGISTER);
