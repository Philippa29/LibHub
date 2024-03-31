import { Action , BookState, CategoryAction, CategoryState, DeleteAction, GetAllAction} from "./interface";

type Books = BookState[];
  
const addbookreducer = (state: BookState , action: Action ) => {
    //console.log("action", action);
    //console.log("state", state);
    switch (action.type) {
      case 'ADD_BOOK':
        if (action.payload) {
            return {
                ...state,
              title: action.payload.title,
              isbn: action.payload.isbn,
              author: action.payload.author,
              publisher: action.payload.publisher,
              categoryID: action.payload.categoryID,
              bookStatus: action.payload.bookStatus,
              bookCondition: action.payload.bookCondition,
              file: action.payload.file,

            };
        }
      





    

    

        default:
        return state;
    }

};

const deleteBookreducer = (state: BookState , action: DeleteAction) => {
    switch (action.type) {
      case 'DELETE_BOOK':
        if (action.payload) {
            return {
                ...state,
              id: action.payload.id,
            };
        }
        console.log("state in getBook", state);
        return state;
    

        default:
        return state;
    }
} 

const getallbooksreducer = (state: Books, action: GetAllAction) => {
  switch (action.type) {
      case 'GET_ALL_BOOKS':
          if (action.payload) {
              console.log("action.payload in get_book", action.payload);
              console.log("state in getBook", state);
              const booksWithId = action.payload.map((book, index) => {
                  return {
                      ...book,
                      BookId: book.bookId // Assigning 'bookId' to the 'id' property
                  };
              });
              return [...booksWithId];
          }
          return state;
    
      default:
          return state;
  }
}




const categoryreducer = (state: CategoryState , action: CategoryAction) => {

    switch (action.type) {
      case 'GET_CATEGORY':
        if (action.payload) {
            return {
                ...state,
              id: action.payload.id,
              name: action.payload.name,
            };
        }
        console.log("state in getBook", state);
        return state;
    

        default:
        return state;
    }
} 

export {addbookreducer , categoryreducer, getallbooksreducer, deleteBookreducer};