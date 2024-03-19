import { createContext, Context } from 'react';

// Define types for context values
export interface AuthState {
  isAuthenticated: boolean;
  authToken: string | null;
   
}

export interface AuthActions {
  login: (credentials: Credentials) => void;
  logout: () => void;
}

interface Credentials {
  username: string;
  password: string;
}

// Create contexts with types
const AuthStateContext: Context<AuthState> = createContext<AuthState>({} as AuthState);
const AuthActionsContext: Context<AuthActions> = createContext<AuthActions>({} as AuthActions);

// Define initial state
const initialState: AuthState = {
  isAuthenticated: false,
  authToken: null,
  

};

export { AuthActionsContext, AuthStateContext, initialState };
