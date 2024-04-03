'use client'
import React, { useContext, useReducer } from 'react';
import { Book, Category } from './interface';
import {addbookreducer, categoryreducer, getallbooksreducer} from './reducer';
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
    const [allbooksstate , dispatchallbooks] = useReducer(getallbooksreducer, []);
    const [categorystate , categorydispatch] = useReducer(categoryreducer, initialCategoryState);
    //const [allBooksState , allBooksDispatch] = useReducer(addbookreducer, initialState);
    const categoryState = useCategoryState();
    // const [category, setCategory] = useState<Category>();
    const { push } = useRouter();
    const [categoryid , setCategoryID] = React.useState<string>(''); 


    const addBook = async (book : FormData) => {
        //the end point of getallcategors the id and name of the catgory is there


        try {

    
            const response = await axios.post('https://localhost:44311/CreateBook', book, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (!response.data.success) {
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


    const getBooks = async () => {
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/Book/GetAllBooks');
    
            // Handle the response data here, such as updating state or performing other actions
            console.log(response.data.result);
            dispatchallbooks({type: 'GET_ALL_BOOKS', payload: response.data.result});
            return response.data.result;
        } catch (error) {
            // Handle errors here
            console.error('Error fetching books:', error);
        }
    }

    const updateBook = async (book: FormData) => {

        console.log("book in updateBook", book);
        // try {
        //     const response = await axios.put('https://localhost:44311/api/services/app/Book/UpdateBook', book, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     if (response.data.success) {
        //         message.success('Book updated successfully');
        //         push('/books');
        //     }
        //     if (!response.data.success) {
        //         throw new Error('Network response was not ok');
        //     }
        // } catch (err: any) {
        //     if (err.response && err.response.status === 500) {
        //         message.error('Internal Server Error: Please try again later');
        //     } else {
        //         message.error('An error occurred while updating book');
        //     }
        // }
    }

    const deleteBook = async (id: string) => {

        try {
            const response = await axios.delete(`https://localhost:44311/api/services/app/DeleteBook/${id}`);
            console.log(response.data.success);
            if(response.data.success){
                message.success('Book deleted successfully');
                //getBooks();
            }
            if (!response.data.success) {
                throw new Error('Network response was not ok');
            }

            //return 
        }
        catch{
            message.error('An error occurred while deleting book');
        }

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

    const getbookbyid = async (id: string) => {
        try {
            const response = await axios.get(`https://localhost:44311/api/services/app/GetBook/${id}`);
            console.log(response.data.result);
            return response.data.result;
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    

    return (
        <CategoryStateContext.Provider value={categorystate}>
        <CategoryActionsContext.Provider value={{ getCategory }}>
       
        <BookStateContext.Provider value={state } >
            <BookActionsContext.Provider value={{addBook , getBooks, deleteBook, updateBook,getbookbyid}}>
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
