export const initialState: BookRequestState = {
    id: '',
    bookId: '',
    studentId: '',
    title: '', 
    author: '',
    isbn: '',
    image: '',
};

export interface BookRequestState {
    id: string,
    bookId: string,
    studentId: string,
    title: string,
    author: string,
    isbn: string,
    image: string,
}

export interface BookRequestAction {
    getAllBookRequest: () => Promise<BookRequest[]>;
    addBookRequest: (bookRequest: BookRequest) => void;
    countBookRequest: () => Promise<number>;
}

export interface Action {
    type: string;
    payload: {
        id: string,
        bookId: string,
        studentId: string,
        title: string,
        isbn: string,
        author: string,
    }
}

export interface GetAllAction {
    type: string;
    payload: BookRequestState[];
}

export interface BookRequest {
    id: string,
    bookId: string,
    studentId: string,
    title: string,
    author: string,
    isbn: string,
}

export interface BookRequestCount {
    type: string;
    payload: number;
}
