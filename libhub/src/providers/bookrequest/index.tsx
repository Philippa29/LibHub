'use client'
import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import { BookRequestActionsContext, BookRequestStateContext, initialBookRequestState } from './context';
import { BookRequestReducer } from './reducer';
import { getBookRequestAction, createBookRequestAction } from './action';
import { bookReducer } from '../book/reducer';
import { initialState } from '../book/context';
import { updateBookAction } from '../book/action';

interface BookRequestProps {
  children: React.ReactNode;
}

const BookRequestProvider: React.FC<BookRequestProps> = ({ children }) => {
    const [state, dispatch] = useReducer(BookRequestReducer, initialBookRequestState);
    const [statebook, dispatchbook] = useReducer(bookReducer, initialState);
    const getAllBookRequest = async () => {
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/BookRequest/GetAllBookRequests');
            console.log("response in the provider for bookrequest: ", response.data.result);
            dispatch(getBookRequestAction(response.data.result)); 
            
            return response.data.result;
        } catch (error) {
            console.error('Error fetching book requests:', error);
        }
    };

    const addBookRequest = async (bookRequest: any) => {
        console.log("inside add book request");
        console.log("bookRequest in the provider: ", state);
            console.log("bookRequest in the provider: ", bookRequest);
        try {
            
            const response = await axios.post('https://localhost:44311/api/BookRequest/CreateBookRequest', bookRequest, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            });
            console.log("reponse in the provider: " , response);
            dispatch(createBookRequestAction(response.data.result));
            dispatchbook(updateBookAction(bookRequest.bookId));
            return response.data.result;
        } catch (error) {
            console.error('Error adding book request:', error);
        }
    };

    const countBookRequest = async () => {
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/BookRequest/GetBookRequestCount');

            return response.data.result;
        } catch (error) {
            console.error('Error fetching book request count:', error);
        }
    }
    
    
    return (
        <BookRequestStateContext.Provider value={state}>
            <BookRequestActionsContext.Provider value={{ getAllBookRequest, addBookRequest , countBookRequest}}>
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
