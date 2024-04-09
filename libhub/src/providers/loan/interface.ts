export const initialState: LoanState = {
    id: '',
    bookRequest : '', 
    book: '',
    loanDate: null,
    returnDate: null,
    isReturned: false,
    isOverdue: false,
    actualReturnDate: null,
    title: '',
    author: '',
    isbn: '',
    student: '',
    librarian: '',
}; 

export interface LoanState {
    id: string,
    bookRequest : string , 
    book: string,
    loanDate: Date,
    returnDate: Date,
    isReturned: false,
    isOverdue: false,
    actualReturnDate: Date,
    title: string,
    author: string,
    isbn: string,
    student: string,
    librarian: string,
}

export interface LoanAction {
    getAllLoans: () => Promise<LoanState[]>;
    getLoan: (id: string) => Promise<LoanState>;
    createLoan: (loan: LoanState) => void;
    deleteLoan: (id: string) => void;
    isReturned: (id: string) => void;
    loanCount: () => Promise<number>;
}

export interface GetAllAction {
    type: string;
    payload: LoanState[];
}

export interface Action {
    type: string;
    payload: LoanState; 
}

export interface LoanCount {
    type: string;
    payload: number;
}