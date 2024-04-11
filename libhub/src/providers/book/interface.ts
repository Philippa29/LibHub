

export const  initialState: BookState = {
  bookId: '',
    title: '',
    isbn: '',
    author: '',
    publisher: '',
    categoryID: '',
    imageId: '',
    bookStatus: 0,
    bookCondition: 0,
    file: null,
}
  
export interface Action {
  type: string;
  payload: SingleItemPayload | ArrayPayload; // Union type
}

export interface SingleItemPayload {
  id: string;
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  categoryID: string;
  bookStatus: number;
  bookCondition: number;
  file: undefined | string | ArrayBuffer | null;
}

export interface ArrayPayload {
  items: SingleItemPayload[];
}

export interface ImageState {
  id: string;
  fileName : string;
  fileType: string;
  base64: string;
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
  bookId: string; 
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  categoryID: string;
  bookStatus: number;
  bookCondition: number;
  imageId: string;
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
        imageId: string;
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

export interface GetImageAction{
  type: string ; 
  payload: string;
}

  
  export interface BookActions {
    addBook: (Book: FormData) => void;
    getBooks: () => void;
    deleteBook: (id: string) => void;
    updateBook: (Book: FormData , Image: FormData) => void; 
    getbookbyid: (id: string) => Promise<getBookbyidstate>;
    countBooks: () => Promise<number>;
    updateImage: (id: string, Image: FormData) => void;
    getAvailableBooks: () => void;
    search: (searchTerm: string) => Promise<Book[]>
  }


