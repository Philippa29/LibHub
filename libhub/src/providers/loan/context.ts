import {createContext} from 'react'; 
import {LoanState , initialState} from './interface';


export interface ILoanContext{
    loan?: LoanState;
    loans?: LoanState[];
}

export const initialLoanState: ILoanContext = {
    loan: null,
    loans: [],
}


export const LoanStateContext = createContext<ILoanContext>(initialLoanState);
export const LoanActionsContext = createContext({
    getAllLoans: async () => [] as LoanState[],
    getLoan: async (id: string) => initialState,
    createLoan: async (loan: LoanState) => {},
    deleteLoan: async (id: string) => {},
    isReturned: async (id: string) => {},
    loanCount: async () => 0,
});