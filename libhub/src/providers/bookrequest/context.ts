import {createContext} from 'react';
import {BookRequestState, BookRequest, BookRequestAction} from './interface';

export const initialState: BookRequestState = {
    id: '',
    bookId: '',
    studentId: '',
    title: '',
    author: '',
    isbn: '',
    
}


export const BookRequestStateContext = createContext<BookRequestState>(initialState);
export const BookRequestActionsContext = createContext<BookRequestAction>({
    getAllBookRequest: async () => [] as BookRequest[],
    addBookRequest: async () => {},
    countBookRequest: async () => 0,

});

