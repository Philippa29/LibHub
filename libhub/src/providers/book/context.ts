import { createContext } from "react";
import { BookActions, BookState , CategoryState, CategoryActions, Category} from "./interface";

// Define types for context values

export const initialState: BookState = {
    title: '',
    author: '',
    publisher: '',
    categoryID: '',
    bookStatus: 0,
    bookCondition: 0,
    file: '',
}

export const initialCategoryState: CategoryState = {
    id: '',
    name: '',
}


export const BookStateContext = createContext<BookState>(initialState);
export const BookActionsContext = createContext<BookActions>({
    addBook: () => { } , 
     // Updated parameter name to match function signature
});

export const CategoryStateContext = createContext<CategoryState>(initialCategoryState);
export const CategoryActionsContext = createContext<CategoryActions>({
    getCategory: async () => [] as Category[], // Adjust the return type
});

//export { BookStateContext, BookActionsContext, initialState };
