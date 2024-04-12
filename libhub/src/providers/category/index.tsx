'use client'

import React , {useContext, useReducer } from 'react'; 
import { CategoryActions, CategoryState, Category} from './interface';
import categoryReducer from './reducer';
import { createCategoryAction, getCategoryAction} from './action';
import { message } from 'antd';
import axios from 'axios';

import { CategoryActionsContext, CategoryStateContext , initialCategoryState} from './context';
import { create } from 'domain';

export interface ICategoryContext {
  category?: CategoryState;
  categories?: CategoryState[];
}
interface CategoryProviderProps {
    children: React.ReactNode;
}

const CategoryProvider : React.FC<CategoryProviderProps> = ({children}) => {

    const [state, dispatch] = useReducer(categoryReducer, initialCategoryState);

    const getCategory = async (): Promise<Category[]> => {
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/Category/GetAllCategories');
            console.log("response in getcategory", response.data.result)
            dispatch(getCategoryAction(response.data.result));
            console.log("state in getcategory", state); 
            return response.data; // Return the fetched data
        } catch (error) {
            message.error('Failed to get category');
            throw error; // Throw the error to be handled elsewhere
        }
    }
    
    const addCategory = async (category: string): Promise<void> => {
    try {
        console.log("Category", category)
        const response = await axios.post('https://localhost:44311/api/services/app/Category/CreateCategory', category);
        
        dispatch(createCategoryAction(response.data));
        if (response.data.success) {
            message.success('Category added successfully');
        } else {
            throw new Error('Failed to add category');
        }
    } catch (error) {
        console.error('Error adding category:', error);
        message.error('An error occurred while adding category');
        throw error;
    }
}

    return (
        <CategoryStateContext.Provider value={state}>
            <CategoryActionsContext.Provider value={{ getCategory, addCategory }}>
                {children}
            </CategoryActionsContext.Provider>
        </CategoryStateContext.Provider>
    );

 
};



const useCategoryState = () => {
    const context = useContext(CategoryStateContext);
    if (context === undefined) {
        throw new Error('useCategoryState must be used within a CategoryProvider');
    }
    return context;


};

const useCategoryActions = () => {
    const context = useContext(CategoryActionsContext);
    if (context === undefined) {
        throw new Error('useCategoryActions must be used within a CategoryProvider');
    }
    return context;
};

export { CategoryProvider , useCategoryState, useCategoryActions };
