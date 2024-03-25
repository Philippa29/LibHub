import { Action , BookState, CategoryAction, CategoryState} from "./interface";

const  initialState: BookState = {
    title: '',
    author: '',
    publisher: '',
    categoryID: '',
    bookStatus: 0,
    bookCondition: 0,
    file: '',
}
  
const addbookreducer = (state: BookState , action: Action) => {
    console.log("action", action);
    console.log("state", state);
    switch (action.type) {
      case 'ADD_BOOK':
        if (action.payload) {
            return {
                ...state,
              title: action.payload.title,
              author: action.payload.author,
              publisher: action.payload.publisher,
              categoryID: action.payload.categoryID,
              bookStatus: action.payload.bookStatus,
              bookCondition: action.payload.bookCondition,
              file: action.payload.file,

            };
        }

    case 'UPDATE_CATEGORY_ID':
        if (action.payload) {
            return {
                ...state,
                categoryID: action.payload.categoryID,
            };
        }
        return state;
    

        default:
        return state;
    }

};

const categoryreducer = (state: CategoryState , action: CategoryAction) => {
    console.log("action", action);
    console.log("state", state);
    switch (action.type) {
      case 'UPDATE_CATEGORY_ID':
        if (action.payload) {
            return {
                ...state,
              id: action.payload.id,
              name: action.payload.name,
            };
        }
        return state;
    

        default:
        return state;
    }
} 

export {addbookreducer , categoryreducer};