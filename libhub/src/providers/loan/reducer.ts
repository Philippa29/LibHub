import { LoanState , Action , GetAllAction, LoanCount } from "./interface";
import { handleActions } from 'redux-actions';
import { ILoanContext, initialLoanState } from './context';
import { ActionTypes } from './action';


const LoansReducer = handleActions<ILoanContext, any>(
    {
        [ActionTypes.CREATE_LOAN]: (state, action) => {
            if (action.payload) {
                // Check if a loan for the same book already exists in the state
                const existingLoan = state.loans.find(loan => loan.book=== action.payload.bookId);
                
                // If the loan for the same book doesn't already exist, append the new loan to the array
                if (!existingLoan) {
                    return {
                        //...state,
                        loans: [ action.payload], // Append the new loan to the existing array of loans
                    };
                }
            }
            return state;
        },
        
        [ActionTypes.GET_LOANS]: (state, action) => {
            console.log("STATE", state , "ACTION", action.payload);
            if (action.payload) {
                //const loan = (state.loans || []).find(loan => loan.id === action.payload.id);
                return {
                    ...state,
                    loans : action.payload // Set the selected loan to the found loan or null if no loan was found
                };
            }
            return state;
        },
        [ActionTypes.IS_RETURNED]: (state, action) => {
            console.log("STATE", state , "ACTION", action.payload); 
            if (action.payload) {
                const updatedLoans = (state.loans || []).filter(loan => loan.id !== action.payload.id);
                console.log("UPDATED LOANS", updatedLoans);
                return {
                    ...state,
                    loans: updatedLoans, // Update the array of loans after filtering out the deleted one
                };
            }
            return state;
        },
        [ActionTypes.LOAN_COUNT]: (state, action) => {
            if (action.payload) {
                return { ...state, count: action.payload }; // Set the count of loans
            }
            return state;
        },
    },
    initialLoanState
);



export {LoansReducer}