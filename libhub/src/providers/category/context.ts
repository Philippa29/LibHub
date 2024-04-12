import { createContext} from "react";
import { CategoryActions, CategoryState, Category} from "./interface";

// Define types for context values
export interface ICategoryContext{
    category?: CategoryState;
    categories?: CategoryState[];
}

export const initialCategoryState: ICategoryContext = {
    category : null,
    categories: [],
}
export const CategoryStateContext = createContext<ICategoryContext>(initialCategoryState);
export const CategoryActionsContext = createContext<CategoryActions>({
    getCategory: async () => [] as Category[], // Adjust the return type
    addCategory: async () => {},
});

