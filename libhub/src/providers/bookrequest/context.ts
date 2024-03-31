import {createContext} from 'react';
import {BookRequestState, BookRequest, BookRequestAction} from './interface';

export const initialState: BookRequestState = {
    bookId: '',
    studentId: '',
    
}


export const BookRequestStateContext = createContext<BookRequestState>(initialState);
export const BookRequestActionsContext = createContext<BookRequestAction>({
    getAllBookRequest: async () => [] as BookRequest[],

});

