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
    const [allimagesstate , dispatchallimages] = useReducer(getallbooksreducer, []);
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

    const getAvailableBooks = async () => { 
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/Book/GetAvailableBooks');
            console.log(response.data.result);
            return response.data.result;
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    const getImage = async (id: string) => {
        try {
            console.log("id in getImage", id);
            const response = await axios.get(`https://localhost:44311/GetStoredFile/${id}`, {
                responseType: 'arraybuffer' // Set responseType to arraybuffer to handle binary data
            });
            console.log("response in getImage", response.data);
    
            // Convert arraybuffer to base64
            const base64Data = btoa(
                new Uint8Array(response.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
    
            // Create a base64 string with appropriate data URI
            const base64Image = `data:${response.headers['content-type']};base64,${base64Data}`;

            console.log("base64Image", base64Image);
    
            // Return the base64 string
            return base64Image;
        } catch (error) {
            console.error('Error fetching image:', error);
            // Handle errors or return a default image URL
            return ''; // or throw error if you prefer
        }
    }

    const getAllImages = async () => {
        try {
            const response = await axios.get('https://localhost:44311/api/services/app/StoredFile/GetAllFiles');
            dispatchallimages({type: 'GET_ALL_IMAGES', payload: response.data.result});
            console.log(response.data.result);
            return response.data.result;
        } catch (error) {
            console.error('Error fetching images:', error);
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

    

    return (
        <CategoryStateContext.Provider value={categorystate}>
        <CategoryActionsContext.Provider value={{ getCategory }}>
       
        <BookStateContext.Provider value={state } >
            <BookActionsContext.Provider value={{addBook , getBooks, deleteBook, updateBook,getbookbyid, getImage,updateImage, getAllImages,getAvailableBooks}}>
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
