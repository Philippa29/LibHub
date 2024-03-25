'use client'
import React, { useContext, useReducer } from 'react';
import { Book, Category } from './interface';
import {addbookreducer, categoryreducer} from './reducer';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { BookActionsContext, CategoryActionsContext, CategoryStateContext, initialCategoryState, initialState } from './context';
import { BookStateContext } from './context';
import axios from 'axios';
interface BookProviderProps {
    children: React.ReactNode;
}

const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
    
    const [state, dispatch] = useReducer(addbookreducer, initialState);
    const [categorystate , categorydispatch] = useReducer(categoryreducer, initialCategoryState);
    const categoryState = useCategoryState();
    // const [category, setCategory] = useState<Category>();
    const { push } = useRouter();
    const [categoryid , setCategoryID] = React.useState<string>(''); 
    const addBook = async (book : Book) => {
        //the end point of getallcategors the id and name of the catgory is there


        try {
            const formData = new FormData();
            formData.append('title', book.title);
            formData.append('author', book.author);
            formData.append('publisher', book.publisher);
            formData.append('categoryID', book.categoryID);
            formData.append('bookStatus', book.bookStatus.toString());
            formData.append('bookCondition', book.bookCondition.toString());
            //formData.append('file', book.file);
    
            const response = await axios.post('https://localhost:44311/CreateBook', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (!response.data.ok) {
                throw new Error('Network response was not ok');
            }
    
            message.success('Book added successfully');
           
        } catch (err: any ) {
            if (err.response && err.response.status === 500) {
                message.error('Internal Server Error: Please try again later');
            } else {
                message.error('An error occurred while adding book');
            }
        }
    };

    const getBook = async () => {

    }


    const getCategory = async () => {
        try {
             //console.log("here");
            const response = await axios.get('https://localhost:44311/api/services/app/Category/GetAllCategories');
            //console.log(response.data.result);

            categorydispatch({type: 'GET_CATEGORY' , payload: response.data.result});
            //console.log(categorydispatch); 
            return response.data.result;
        } catch (err: any) {
            if (err.response && err.response.status === 500) {
                message.error('Internal Server Error: Please try again later');
            } else {
                message.error('An error occurred while fetching categories');
            }
        }
    }

    

    return (
        <CategoryStateContext.Provider value={categorystate}>
        <CategoryActionsContext.Provider value={{ getCategory }}>
       
        <BookStateContext.Provider value={state } >
            <BookActionsContext.Provider value={{addBook }}>
                {children}
            </BookActionsContext.Provider>
        </BookStateContext.Provider> 
        </CategoryActionsContext.Provider>
        </CategoryStateContext.Provider>
    );
};

const useBookState = () => {
    const context = useContext(BookStateContext);
    if (!context) {
        throw new Error('useBookState must be used within a BookProvider');
    }
    return context;
};

const useBookActions = () => {
    const context = useContext(BookActionsContext);
    if (!context) {
        throw new Error('useBookActions must be used within a BookProvider');
    }
    return context;
};

const useCategoryState = () => {
    const context = useContext(CategoryStateContext);
    if (!context) {
        throw new Error('useCategoryState must be used within a BookProvider');
    }
    return context;
}

const useCategoryActions = () => {
    const context = useContext(CategoryActionsContext);
    if (!context) {
        throw new Error('useCategoryActions must be used within a BookProvider');
    }
    return context;
}

export { BookProvider, useBookState, useBookActions, useCategoryState, useCategoryActions };
