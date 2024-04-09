import { LoanState , Action , GetAllAction, LoanCount } from "./interface";


type Loans = LoanState[];
const GetAllLoansReducer = (state: Loans, action: GetAllAction) => {
    switch (action.type) {
        case 'GET_ALL_LOAN':
            if (action.payload) {
                console.log("action.payload for loan", action.payload)
                const loans = action.payload.map((loan, index) => {
                    return {
                        ...loan,
                        bookRequest: loan.bookRequest,
                        book: loan.book,
                        isReturned: loan.isReturned,
                        isOverdue: loan.isOverdue,
                    };
                });
                return [...loans];
            }
            // Return the current state if the payload is falsy or not provided
            return state;
        // Add a default case to return the current state if the action type is unknown
        default:
            return state;
    }
}

const AddLoanReducer = (state: LoanState, action: Action) => {
    switch (action.type) {
        case 'ADD_LOAN':
            if (action.payload) {
                return {
                    bookRequest: action.payload.bookRequest,
                    book: action.payload.book,
                    isReturned: action.payload.isReturned,
                    isOverdue: action.payload.isOverdue,
                };
            }
            return state;
        default:
            return state;
    }
}

const LoanCountReducer = (state: number, action: LoanCount) => {
    switch (action.type) {
        case 'LOAN_COUNT':
            return action.payload;
        default:
            return state;
    }
}

export {GetAllLoansReducer, AddLoanReducer, LoanCountReducer}