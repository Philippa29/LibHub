export const initialState: BookRequestState = {
    bookId: '',
    studentId: '',
    title: '', 
    author: '',
    isbn: '',
};

export interface BookRequestState {
    bookId: string,
    studentId: string,
    title: string,
    author: string,
    isbn: string,
}

export interface BookRequestAction {
    getAllBookRequest: () => Promise<BookRequest[]>;
}

export interface Action {
    type: string;
    payload: {
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
    bookId: string,
    studentId: string,
    title: string,
    author: string,
    isbn: string,
}
