import { createContext} from 'react';
import {  RegisterState, RegisterActions} from './interface';

// Define types for context values
const initialState: RegisterState = {
    name: '',
    surname: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    studentID: '',
};



// Create contexts with types
const RegsiterStateContext = createContext<RegisterState>(initialState);
const RegsiterActionsContext = createContext<RegisterActions>({
    registeruser: () => {},
});








export { RegsiterActionsContext, RegsiterStateContext, initialState};