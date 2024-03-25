// export interface Credentials {
//     userNameOrEmailAddress: string;
//     password: string;
//   }

//  export  interface AuthState {
//     isAuthenticated: boolean;
//     authToken: string | null;
//   }
  
 export  interface Action {
    type: string;
    payload: {
    name: string;
    surname: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
    studentID: string;
  }; // Payload is optional, as it's only used for the LOGIN action
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


  
  export interface RegisterActions {
    registeruser: (register: Register) => void;
  }