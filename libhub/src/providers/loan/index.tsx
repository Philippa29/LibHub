'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { LoanActionsContext , LoanStateContext  } from './context';
import { LoanState , initialState } from './interface';

interface LoanProps {
    children: React.ReactNode;
}



const LoanProvider: React.FC<LoanProps> = ({ children }) => {
    const [state, setState] = useState(initialState);

    const getAllLoans = async () => {
        console.log("inside get all loans");
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/Loan/GetAllLoans', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            });
            console.log("reponse in the provider: ", response);
            return response.data.result;
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    };
    

    const createLoan = async (loan: LoanState) => {
        console.log("inside create loan");
        console.log("loan in the provider: ", loan);

       // console.log(localStorage.getItem('authToken'));
    
        const createLoanData = { bookRequest: loan.bookRequest, book: loan.book };
        console.log("createLoanData in the provider: ", createLoanData);
    
        try {
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
            return response.data.result;
        } catch (error) {
            console.error('Error creating loan:', error);
        }
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
            
            console.log("response in the provider: ", response);
            return response.data.result;
        } catch (error) {
            console.error('Error checking if loan is returned:', error);
        }
    };
    
    



    return (
        <LoanStateContext.Provider value={state}>
            <LoanActionsContext.Provider value={{ getAllLoans, createLoan , deleteLoan , getLoan, isReturned}}>
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