import { handleActions } from 'redux-actions';
import { ActionTypes } from './action'; // Import ActionTypes from actions file
import { CategoryState } from './interface';
import { ICategoryContext, initialCategoryState } from './context';

const categoryReducer = handleActions<ICategoryContext, any>(
    {
        [ActionTypes.GET_CATEGORY]: (state, action) => {
            if (action.payload) {
                console.log("action", action.payload)
                return {
                    ...state , categories: action.payload
                };
            }
           
            return state;
        },

        [ActionTypes.CREATE_CATEGORY]: (state, action) => 
            { 
                if (action.payload) 
                { 
                    return { 
                        ...state, id: action.payload.id, name: action.payload.name, };
             } 
             return state; }
    },
    initialCategoryState // Initial state with id and name properties
);

export default categoryReducer;
