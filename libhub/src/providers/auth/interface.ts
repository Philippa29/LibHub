export interface Credentials {
    userNameOrEmailAddress: string;
    password: string;
  }

 export  interface AuthState {
    isAuthenticated: boolean;
    authToken: string | null;
  }
  
 export  interface Action {
    type: string;
    payload?: string; // Payload is optional, as it's only used for the LOGIN action
  }

  export  interface RegisterState {
      name: string;
      surname: string;
      emailAddress: string;
      phoneNumber: string;
      password: string;
      studentID: string;
    }

  export interface Register{
    name: string;
    surname: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
    studentID: string;
  }

  export interface AuthActions {
    login: (credentials: Credentials) => Promise<void>;
    logout: () => void;
    
  }
  
  export interface RegisterActions {
    register: (register: Register) => void;
  }