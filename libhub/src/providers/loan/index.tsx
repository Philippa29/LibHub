'use client'

import React, { useReducer, useState } from 'react';
import axios from 'axios';
import { LoanActionsContext , LoanStateContext, ILoanContext, initialLoanState  } from './context';
import { LoanState , initialState } from './interface';
import { LoansReducer } from './reducer';
import { create } from 'domain';
import { createLoanAction , getLoansAction , isReturnedAction} from './action';
import { updateBookRequestAction } from '../bookrequest/action';
import { BookRequestReducer } from '../bookrequest/reducer';
import { initialBookRequestState } from '../bookrequest/context';
import { message } from 'antd';
interface LoanProps {
    children: React.ReactNode;
}



const LoanProvider: React.FC<LoanProps> = ({ children }) => {
    const [state, dispatch] = useReducer(LoansReducer, initialLoanState);
    const [stateBookRequest, dispatchBookRequest] = useReducer(BookRequestReducer, initialBookRequestState);
    
    const getAllLoans = async () => {
        console.log("inside get all loans");
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/Loan/GetAllLoans', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            });
            console.log("reponse in the provider: ", response);
            dispatch(getLoansAction (response.data.result));
            return response.data.result;
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    };
    

    const createLoan = async (loan: LoanState) => {
        console.log("inside create loan");
        console.log("loan in the provider: ", loan);
        console.log("authToken in the provider: ", localStorage.getItem('authToken')    );
  const createLoanData = { bookRequest: loan.bookRequest, book: loan.book };
       // console.log(localStorage.getItem('authToken'));
   
      
        console.log("createLoanData in the provider: ", createLoanData.bookRequest);
    
       
            const response = await axios.post('https://localhost:44311/api/services/app/Loan/CreateLoan', createLoanData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            });
            console.log("response in the provider: ", response);

                    dispatchBookRequest(updateBookRequestAction(createLoanData.bookRequest));
                    dispatch(createLoanAction(response.data.result));
            return response.data.result;
      
        
    };
    
    

    const deleteLoan = async (id: string) => {
        try{
            const response = await axios.delete('https://localhost:44311/api/services/app/Loan/DeleteLoan', {params: {id}});
            console.log("reponse in the provider: " , response);
            return response.data.result;
        }
        catch(error){
            console.error('Error deleting loan:', error);
        }
    }

    const getLoan = async (id: string) => {
        try{
            const response = await axios.get('https://localhost:44311/api/services/app/Loan/GetLoan', {params: {id}});
            console.log("reponse in the provider: " , response);
            return response.data.result;
        }
        catch(error){
            console.error('Error getting loan:', error);
        }
    }

    const isReturned = async (id: string) => {
        try {
            console.log("inside isReturned");
            console.log("id in isReturned: ", id);
            
            const response = await axios.get(`https://localhost:44311/api/services/app/Loan/ReturnBook/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            });
            dispatch(isReturnedAction(response.data.result));
            console.log("response in the provider: ", response);
            message.success('Book returned successfully');
            return response.data.result;
        } catch (error) {
            console.error('Error checking if loan is returned:', error);
        }
    };

    const loanCount = async () => {
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/Loan/GetLoanCount');
            console.log("reponse in the provider: ", response);
            return response.data.result;
        } catch (error) {
            console.error('Error fetching loan count:', error);
        }
    };
    
    



    return (
        <LoanStateContext.Provider value={state}>
            <LoanActionsContext.Provider value={{ getAllLoans, createLoan , deleteLoan , getLoan, isReturned, loanCount}}>
                {children}
            </LoanActionsContext.Provider>
        </LoanStateContext.Provider>
    );
}


const useLoanState = () => {
    const context = React.useContext(LoanStateContext);
    if (context === undefined) {
        throw new Error('useLoanState must be used within a LoanProvider');
    }
    return context;
}

const useLoanActions = () => {
    const context = React.useContext(LoanActionsContext);
    if (context === undefined) {
        throw new Error('useLoanActions must be used within a LoanProvider');
    }
    return context;
}


export { LoanProvider, useLoanState, useLoanActions };