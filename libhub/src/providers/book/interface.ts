

export const  initialState: BookState = {
  bookId: '',
    title: '',
    isbn: '',
    author: '',
    publisher: '',
    categoryID: '',
    bookStatus: 0,
    bookCondition: 0,
    file: null,
}
  
export interface Action {
    type: string;
    payload: {
      id: string;
        title: string;
        isbn: string;
        author: string;
        publisher: string;
        categoryID: string;
        bookStatus: number;
        bookCondition: number;
        file: undefined | string | ArrayBuffer | null;
    }; // Payload is optional, as it's only used for the LOGIN action
}

export interface getbookbyidAction {
  type: string;
  payload: {
    
    title: string;
    isbn: string;
    author: string;
  } 
}

export interface DeleteAction{
  type: string ; 
  payload: {
    id: string;
  }



}


export interface getBookbyidstate{
  id: string;
  author: string;
  title: string;
  isbn: string;
 
}


export interface GetAllAction{
  type: string ; 
  payload: BookState[]; 
}

export interface CategoryAction {
  type: string;
  payload: {
    id: string;
    name: string;

  }
}

export interface BookState {
  bookId: string; // Change to lowercase 'bookId'
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  categoryID: string;
  bookStatus: number;
  bookCondition: number;
  file: undefined | string | ArrayBuffer | null;
}

    export  interface CategoryState {
      id: string;
      name: string;
      }

      export interface Book {
        bookId: string;
        title: string;
        isbn: string;
        author: string;
        publisher: string;
        categoryID: string;
        bookStatus: number;
        bookCondition: number;
        file: {
          base64String: string;
          name: string;
          type: string;
        } | undefined;
      }
 export  interface Category {
    id: string;
    name: string;
}

export interface CategoryState {
  id: string;
  name: string;
}

  
  export interface BookActions {
    addBook: (Book: FormData) => void;
    getBooks: () => Promise<Book[]>;
    deleteBook: (id: string) => void;
    updateBook: (Book: FormData) => void; 
    getbookbyid: (id: string) => Promise<getBookbyidstate>;
  }

  export interface CategoryActions {
    getCategory: () => Promise<Category[]>;
  }
