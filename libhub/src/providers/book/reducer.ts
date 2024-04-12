import { Action, BookActions  } from "./interface";
import { IBookContext, initialState } from "./context";
import { handleActions } from "redux-actions";
import { ActionTypes } from "./action";


export const bookReducer = handleActions<IBookContext, any>(
  {
    [ActionTypes.CREATE_BOOK]: (state, action) => {
      if (action.payload) {
        return {
          ...state,
          books: [...state.books, action.payload], // Append the new book to the existing array of books
        };
      }
      return state;
    },
    [ActionTypes.UPDATE_BOOK]: (state, action) => {
      if (action.payload) {
        // change the book with the same id as the updated book
        const updatedBooks = state.books.map(book =>
          book.bookId === action.payload.bookId ? action.payload : book
        );
        return {
          ...state,
          books: updatedBooks, // Update the array of books with the updated one
        };        
      }
      return state;
    },
    [ActionTypes.GET_BOOK]: (state, action) => {
      if (action.payload) {
        const book = state.books.find(book => book.bookId === action.payload.id);
        return {
          ...state,
          selectedBook: book || null, // Set the selected book to the found book or null if no book was found
        };
      }
      return state;
    },
    [ActionTypes.DELETE_BOOK]: (state, action) => {
      if (action.payload) {
        console.log("action", action.payload)
        const books = state.books.filter(book => book.bookId !== action.payload);
        return {
          ...state,
          books: books, // Set the selected book to the found book or null if no book was found
        };
      }
      return state;
    },

    [ActionTypes.GET_ALL_BOOKS]: (state, action) => {
      if (action.payload) {
        return { ...state, books: action.payload }; // Replace the existing books with the new array of books
      }
      return state;
    },
    // Add more action handlers here as needed
  },
  initialState // This is the initial state
);
  



const getBookByIdInitialState: GetBookByIdState = {
  author: '',
  title: '',
  isbn: '',
};





export interface GetBookByIdState {
  author: string;
  title: string;
  isbn: string;
}

export interface GetBookByIdAction {
  type: string;
  payload: {
    id: string;
    author: string;
    title: string;
    isbn: string;
  };
}



