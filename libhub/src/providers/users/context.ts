import { createContext } from 'react';
import { UserState, UserAction } from './interface';
import { Book } from '../book/interface';
import { LoanState } from '../loan/interface';

export const initialState: UserState = {
    studentID: '',
    name: '',
    surname: '',
    emailAddress: '',
}

export interface User {
    studentID: string; 
    name : string; 
    surname : string; 
    emailAddress : string; 
}



export const UserStateContext = createContext<UserState>(initialState);
export const UserActionsContext = createContext<UserAction>({
    getUser: async () => [] as User[],
    getUserById: async () => {},
    getUserCount : async () => 0,
    getUsersLoan: async () => [] as LoanState[],
    getUsersBookRequests: async () => [] as Book[],

});
