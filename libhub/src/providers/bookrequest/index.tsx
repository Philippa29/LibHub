'use client'
import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import { BookRequestActionsContext, BookRequestStateContext, initialState } from './context';
import { AddBookRequestReducer, GetAllBookRequestReducer } from './reducer';

interface BookRequestProps {
  children: React.ReactNode;
}

const BookRequestProvider: React.FC<BookRequestProps> = ({ children }) => {
    const [state, dispatch] = useReducer(AddBookRequestReducer, initialState);
    
    const getAllBookRequest = async () => {
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/BookRequest/GetAllBookRequests');
            console.log("reponse in the provider: " , response);
            return response.data.result;
        } catch (error) {
            console.error('Error fetching book requests:', error);
        }
    };
    
    return (
        <BookRequestStateContext.Provider value={state}>
            <BookRequestActionsContext.Provider value={{ getAllBookRequest }}>
                {children}
            </BookRequestActionsContext.Provider>
        </BookRequestStateContext.Provider>
    );
}

const useBookRequestState = () => {
    const context = useContext(BookRequestStateContext);
    if (context === undefined) {
        throw new Error('useBookRequestState must be used within a BookRequestProvider');
    }
    return context;
}

const useBookRequestActions = () => {
    const context = useContext(BookRequestActionsContext);
    if (context === undefined) {
        throw new Error('useBookRequestActions must be used within a BookRequestProvider');
    }
    return context;
}

export { BookRequestProvider, useBookRequestState, useBookRequestActions };
