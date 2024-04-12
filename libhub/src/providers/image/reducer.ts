import { IImageContext } from './context';
import { handleActions } from 'redux-actions';
import { ActionTypes } from './actions';
import { Actions } from './interface';



const ImagesReducer = handleActions<IImageContext, any>(
    {
      [ActionTypes.GET_ALL_IMAGES]: (state, action) => {
        // Since the payload is always an array, replace the existing state
        return { ...state, images: [...action.payload] };
      },
      [ActionTypes.GET_IMAGE]: (state, action) => {
        // Treat 'GET_IMAGE' action as setting a single image to the state
        console.log("action", action.payload)
        return { ...state, image: action.payload };
      },
      
    },
    {} // This is the initial state, replace with your actual initial state
  );
  
  export default ImagesReducer;


