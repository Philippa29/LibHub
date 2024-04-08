import { createContext } from "react";
import { BookActions, BookState , CategoryState, CategoryActions, Category, Book, ImageState} from "./interface";

// Define types for context values

export const initialState: BookState = {
    bookId: '',
    title: '',
    isbn: '',
    author: '',
    publisher: '',
    categoryID: '',
    bookStatus: 0,
    bookCondition: 0,
    imageId: '',
    file: '',
}

export const initialCategoryState: CategoryState = {
    id: '',
    name: '',
}

export const initialImagesState: ImageState = {
    id: '',
    fileName : '',
    fileType: '',
    base64: '',
} 



export const BookStateContext = createContext<BookState>(initialState);
export const BookActionsContext = createContext<BookActions>({
    addBook: async () => { } , 
    getBooks: async () => [] as Book[],
    deleteBook: async () => {},
    updateBook: async () => {}, 
    getbookbyid: async () => ({ id: '', author: '', title: '', isbn: '' }),
    countBooks: async () => 0,
    getImage: async () => '',
    updateImage : async () => {},
    getAllImages : async () => [] as ImageState[],
    getAvailableBooks: async () => [] as Book[],
    searchAuthor: async () => [] as Book[],
    searchTitle: async () => [] as Book[],
    searchIsbn: async () => [] as Book[],
    

});

export const CategoryStateContext = createContext<CategoryState>(initialCategoryState);
export const CategoryActionsContext = createContext<CategoryActions>({
    getCategory: async () => [] as Category[], // Adjust the return type
    addCategory: async () => {},
});

//export { BookStateContext, BookActionsContext, initialState };
