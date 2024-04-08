import { Book } from "../book/interface";
import { LoanState } from "../loan/interface";


export interface UserState {
    studentID: string;
    name: string;
    surname: string;
    emailAddress: string;
}

export interface UserAction {
    getUser: () => Promise<UserState[]>;
    getUserById: (studentId: string) => void;
    getUserCount: () => Promise<number>;
    getUsersLoan: () => Promise<LoanState[]>;
    getUsersBookRequests: () => Promise<Book[]>;

    
}

export interface GetUsersAction {
    type: string;
    payload: UserState[]; 
}

export interface Action {
    type: string;
    payload: {
        studentID: string;
        name: string;
        surname: string;
        emailAddress: string;
    }
}

export interface UserCount {
    type: string;
    payload: number;
}


