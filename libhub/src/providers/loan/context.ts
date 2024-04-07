import {createContext} from 'react'; 
import {LoanState , initialState} from './interface';
import { isReturned } from './action';



export const LoanStateContext = createContext<LoanState>(initialState);
export const LoanActionsContext = createContext({
    getAllLoans: async () => [] as LoanState[],
    getLoan: async (id: string) => initialState,
    createLoan: async (loan: LoanState) => {},
    deleteLoan: async (id: string) => {},
    isReturned: async (id: string) => {},
});