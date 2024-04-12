import { createContext } from "react";
import { BookActions, BookState , Book} from "./interface";

// Define types for context values

export interface IBookContext{
    book?: BookState;
    books?: BookState[];
}

export const initialState: IBookContext = {
    book:null,
    books: [],
}




export const BookStateContext = createContext<IBookContext >(initialState);
export const BookActionsContext = createContext<BookActions>({
    addBook: async () => { } , 
    getBooks: async () => [] as Book[],
    deleteBook: async () => {},
    updateBook: async () => {}, 
    getbookbyid: async () => ({ id: '', author: '', title: '', isbn: '' }),
    countBooks: async () => 0,
    updateImage : async () => {},
    
    getAvailableBooks: async () => [] as Book[],

    search: async () => [] as Book[],

    

});



//export { BookStateContext, BookActionsContext, initialState };
