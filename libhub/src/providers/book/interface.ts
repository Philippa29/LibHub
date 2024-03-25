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
    author: '',
    publisher: '',
    categoryID: '',
    bookStatus: 0,
    bookCondition: 0,
    file: '',
}
  
export interface Action {
    type: string;
    payload: {
        title: string;
        author: string;
        publisher: string;
        categoryID: string;
        bookStatus: number;
        bookCondition: number;
        file: string;
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
    author: string;
    publisher: string;
    categoryID: string;
    bookStatus: number;
    bookCondition: number;
    file: string;
    }

    export  interface CategoryState {
      id: string;
      name: string;
      }

  export interface Book{
    title: string;
    author: string;
    publisher: string;
    categoryID: string;
    bookStatus: number;
    bookCondition: number;
    file: string;
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
    addBook: (Book: Book) => void;
  }

  export interface CategoryActions {
    getCategory: () => Promise<Category[]>;
  }
