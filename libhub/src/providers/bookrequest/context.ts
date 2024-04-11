import {createContext} from 'react';
import {BookRequestState, BookRequest, BookRequestAction} from './interface';

export const initialState: BookRequestState = {
    id: '',
    bookId: '',
    studentId: '',
    title: '',
    author: '',
    isbn: '',
    image: '',
    
}

export interface IBookRequest {
    bookRequest?: BookRequestState;
    bookRequests?: BookRequestState[];
    count?: number;
}

export const initialBookRequestState: IBookRequest = {
    bookRequest: null,
    bookRequests: [],
    count: 0,
    
}


export const BookRequestStateContext = createContext<IBookRequest>(initialBookRequestState);
export const BookRequestActionsContext = createContext<BookRequestAction>({
    getAllBookRequest: async () => [] as BookRequest[],
    addBookRequest: async () => {},
    countBookRequest: async () => 0,

});

