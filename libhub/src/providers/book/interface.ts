// export interface Credentials {
//     userNameOrEmailAddress: string;
//     password: string;
//   }

//  export  interface AuthState {
//     isAuthenticated: boolean;
//     authToken: string | null;
//   }

export const  initialState: BookState = {
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

export interface CategoryAction {
  type: string;
  payload: {
    id: string;
    name: string;

  }
}

  export  interface BookState {
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
  }

  export interface CategoryActions {
    getCategory: () => Promise<Category[]>;
  }
