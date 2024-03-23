import { createContext, Context } from 'react';
import { Credentials } from './interface';

// Define types for context values
export interface AuthState {
  isAuthenticated: boolean;
  authToken: string | null;
   
}

export interface AuthActions {
  login: (credentials: Credentials) => void;
  logout: () => void;
}
const initialState: AuthState = {
  isAuthenticated: false,
  authToken: null,
  

};


// Create contexts with types
const AuthStateContext = createContext<AuthState>(initialState);
const AuthActionsContext = createContext<AuthActions>({
  login: () => {},
  logout: () => {}
});





export { AuthActionsContext, AuthStateContext, initialState };
