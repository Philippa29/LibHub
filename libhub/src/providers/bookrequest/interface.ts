



export const initialState : BookRequestState = {
    bookId: '',
    studentId: '',
   

} 

export interface BookRequestState {
    bookId: string,
    studentId: string,
    
}

export interface BookRequestAction {
    getAllBookRequest: () => Promise<BookRequest[]>;
}

export interface Action {
    type: string;
    payload: {
        bookId: string,
        studentId: string,
        
    }
}

export interface GetAllAction {
    type: string;
    payload: BookRequestState[];
}

export interface BookRequest {
    bookId: string,
    studentId: string,
    
}