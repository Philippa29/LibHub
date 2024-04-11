export interface CategoryState {
    id: string;
    name: string;
  }
export interface CategoryActions {
    getCategory: () => Promise<Category[]>;
    addCategory: (Category: string) => void;
  }

  export interface CategoryAction {
    type: string;
    payload: {
      id: string;
      name: string;
  
    }
  }

  export  interface Category {
    id: string;
    name: string;
}