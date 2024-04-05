export const initialState: LoanState = {
    id: '',
    bookRequest : '', 
    book: '',
    loanDate: new Date(),
    returnDate: new Date(),
    isReturned: false,
    isOverdue: false,
    actualReturnDate: new Date(),
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
}

export interface GetAllAction {
    type: string;
    payload: LoanState[];
}

export interface Action {
    type: string;
    payload: LoanState; 
}