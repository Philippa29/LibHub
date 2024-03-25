import { RegisterState } from "./interface";
import { Action } from "./interface";
  
  const initialState: RegisterState = {
    name: '',
    surname: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    studentID: '',
  };
  
  const registerReducer = (state: RegisterState, action: Action): RegisterState => {
    console.log("action", action);
    console.log("state", state);
    switch (action.type) {
      case 'REGISTER':
        if (action.payload) {
            return {
              name: action.payload.name,
              surname: action.payload.surname,
              emailAddress: action.payload.emailAddress,
              phoneNumber: action.payload.phoneNumber,
              password: action.payload.password,
              studentID: action.payload.studentID,
            };
          }
          // If action.payload is undefined, return the current state
          return state;

      
      default:
        return state;
    }
  };
  
  export default registerReducer;
  