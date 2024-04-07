import {BookRequestState, Action, GetAllAction } from './interface';


type BookRequests = BookRequestState[];
const GetAllBookRequestReducer = (state: BookRequests, action: GetAllAction) => {
    switch (action.type) {
        case 'GET_BOOKREQUEST':
            if (action.payload) {
                console.log("action.payload for book request", action.payload)
                const bookRequests = action.payload.map((bookRequest, index) => {
                    return {
                        ...bookRequest,
                        id: bookRequest.id,
                        bookId: bookRequest.bookId,
                        studentId: bookRequest.studentId,
                    };
                });
                return [...bookRequests];
            }
            // Return the current state if the payload is falsy or not provided
            return state;
        // Add a default case to return the current state if the action type is unknown
        default:
            return state;
    }
};

const AddBookRequestReducer = (state: BookRequestState, action: Action) => {
    switch (action.type) {
        case 'ADD_BOOKREQUEST':
            if (action.payload) {
                return {
                    id: action.payload.id,
                    bookId: action.payload.bookId,
                    studentId: action.payload.studentId,
                    title: action.payload.title,
                    isbn: action.payload.isbn,
                    author: action.payload.author,
                };
            }
            return state;
        default:
            return state;
    }
}





export {GetAllBookRequestReducer, AddBookRequestReducer}

