'use client'
import React, { useContext, useReducer } from 'react';
import { Book } from './interface';
import { bookReducer} from './reducer';
import { message } from 'antd';
import { createBookAction , deleteBookAction, getAllBookAction , updateBookAction } from './action';
import { BookActionsContext, initialState } from './context';
import { BookStateContext } from './context';
import axios from 'axios';
interface BookProviderProps {
    children: React.ReactNode;
}

const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
    


    const [state, dispatch] = useReducer(bookReducer, initialState);
    //const [categorystate, categorydispatch] = useReducer(categoryreducer, initialCategoryState);


    const addBook = async (book : FormData) => {
        //the end point of getallcategors the id and name of the catgory is there
        console.log("book in addBook", book.get('title'));

        try {

    
            const response = await axios.post('https://localhost:44311/CreateBook', book, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(createBookAction(response.data.result));
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
            dispatch(getAllBookAction(response.data.result));
            
        } catch (error) {
            // Handle errors here
            console.error('Error fetching books:', error);
        }
    }

    const getAvailableBooks = async () => { 
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/Book/GetAvailableBooks');
            console.log(response.data.result);
            dispatch(getAllBookAction(response.data.result));
            
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }


    
    const updateBook = async (book: FormData, image : FormData) => {

       
          

        console.log("book in updateBook", book);

        //i want to make sure if there is no image update that the image is not updated
        console.log("image" , image.get('file')); 
        if(image.get('file') !== null){
            const reponse = await updateImage(book.get('imageId') as string, image);
            console.log("response in updateBook", reponse);
        }

        

        

        const id = book.get('bookId')

        console.log("id in updateBook", id)
        
        console.log(book.keys())
        try {
            const response = await axios.put(`https://localhost:44311/api/services/app/UpdateBook/${id}`, book, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
            console.log("response in updateBook", response.data.result);
            dispatch(updateBookAction(response.data.result));
            if (response.data.success) {
                message.success('Book updated successfully');
                //push('/books');
            }
            if (!response.data.success) {
                throw new Error('Network response was not ok');
            }
        } catch (err: any) {
            if (err.response && err.response.status === 500) {
                message.error('Internal Server Error: Please try again later');
            } else {
                message.error('An error occurred while updating book');
            }
        }
    }

    const deleteBook = async (id: string) => {

        try {
            const response = await axios.delete(`https://localhost:44311/api/services/app/DeleteBook/${id}`);
            dispatch(deleteBookAction(id));
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
    

    const getbookbyid = async (id: string) => {
        try {
            const response = await axios.get(`https://localhost:44311/api/services/app/GetBook/${id}`);
            console.log(response.data.result);
            return response.data.result;
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    const updateImage = async (id: string, image: FormData) => {
        try {

            image.append('id', id);
            const response = await axios.put(`https://localhost:44311/api/services/app/UpdateImage/${id}`, image, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                message.success('Image updated successfully');
                //push('/books');
            }
            if (!response.data.success) {
                throw new Error('Network response was not ok');
            }
        } catch (err: any) {
            if (err.response && err.response.status === 500) {
                message.error('Internal Server Error: Please try again later');
            } else {
                message.error('An error occurred while updating image');
            }
        }
    }

    const search = async (searchTerm: string) => {
    try {
            console.log("searchTerm", searchTerm);
            const response = await axios.get(`https://localhost:44311/api/services/app/Book/SearchBooks?request=${searchTerm}`);
            dispatch(getAllBookAction(response.data.result));
            console.log(response.data.result);
            dispatch(getAllBookAction(response.data.result));
            return response.data.result;
        } catch (error) {
            console.error('Error searching books:', error);
        }
    }



    const countBooks = async () => {
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/Book/GetBooksCount');
            return response.data.result;
        } catch (error) {
            console.error('Error fetching book count:', error);
        }
    }



    

    return (
       
        <BookStateContext.Provider value={state } >
            <BookActionsContext.Provider value={{addBook , getBooks, deleteBook, updateBook,getbookbyid,updateImage,getAvailableBooks, search , countBooks}}>
                {children}
            </BookActionsContext.Provider>
        </BookStateContext.Provider> 
        
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



export { BookProvider, useBookState, useBookActions };
