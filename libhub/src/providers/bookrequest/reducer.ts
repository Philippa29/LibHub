import { Action, GetAllAction, BookRequestCount } from './interface';
import { handleActions } from 'redux-actions';
import { IBookRequest, initialBookRequestState } from './context';
import { ActionTypes } from './action';


const BookRequestReducer = handleActions<IBookRequest, any>(
    {
        [ActionTypes.CREATE_BOOKREQUEST]: (state, action) => {
            if (action.payload) {
                // Check if the book request already exists in the state
                const existingBookRequest = state.bookRequests.find(bookRequest => bookRequest.id === action.payload.id);
                
                // If the book request doesn't already exist, append it to the array
                if (!existingBookRequest) {
                    return {
                        
                        bookRequests: [...state.bookRequests, action.payload], // Append the new book request to the existing array of book requests
                    };
                }
            }
            return state;
        },
        
        [ActionTypes.GET_BOOKREQUEST]: (state, action) => {
            console.log("State", state);
            if (action.payload) {
                // Check if the book request with the same ID already exists in the state
                const existingRequestIndex = state.bookRequests.findIndex(request => request.bookId === action.payload.id);
                
                // If the book request doesn't already exist, update the bookRequests array with the payload from the action
                if (existingRequestIndex === -1) {
                    return {
                        ...state, 
                        bookRequests: action.payload, // Update the bookRequests array with the payload from the action
                    };
                }
            }
            return state;
        },
        
    [ActionTypes.UPDATE_BOOKREQUEST]: (state, action) => {
        console.log("state in update: ",state,"bookrequest UPDATE",action.payload)
        if (action.payload) {
          const updatedBookRequests = state.bookRequests.filter(bookRequest => {
            console.log("bookRequest",bookRequest)
            return  bookRequest.id !== action.payload
          }
           
          
          );
          return {
            ...state,
            bookRequests: updatedBookRequests, // Update the array of book requests after filtering out the matching one
          };
        }
        return state;
      },
    [ActionTypes.BOOKREQUEST_COUNT]: (state, action) => {
        if (action.payload) {
            return { ...state, count: action.payload }; // Set the count of book requests
        }
        return state;
    },

}, initialBookRequestState );

export {BookRequestReducer}