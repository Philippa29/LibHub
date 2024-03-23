import React, { useReducer, useContext } from "react";
import authReducer from "./reducer";
import { AuthStateContext, AuthActionsContext, initialState } from "./context";
import { message } from 'antd';
import { Credentials } from './interface';
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const {push} = useRouter();

  console.log("state", state);
  console.log("dispatch", dispatch);
  const login = async (credentials: Credentials) => {
    try {
      console.log("credentials in login: ", credentials); 
      console.log(process.env["NEXT_PUBLIC_AUTH_URL"], "process.env");
      const response = await fetch(`${process.env["NEXT_PUBLIC_AUTH_URL"]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
        body: JSON.stringify({ ...credentials }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json();
      dispatch({ type: 'LOGIN', payload: result.result.accessToken });
      localStorage.setItem('authToken', result.result.accessToken); // Update localStorage with the received token
      message.success('Login successful');
    } catch (error) {
      
      message.error('An error occurred while logging in');
    }

    push('/dashboard');
  };

  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('authToken');
    if(localStorage.getItem('authToken') === null) {
    message.success('Logout successful'); 
    }
    else
    {
      message.error('An error occurred while logging out');
    }
   
  };

  return (
    <AuthStateContext.Provider value={{ isAuthenticated: state.isAuthenticated, authToken: state.authToken }}>
      <AuthActionsContext.Provider value={{ login, logout }}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};

// Define hooks to access Auth state and actions
const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

const useAuthActions = () => {
  const context = useContext(AuthActionsContext);
  if (!context) {
    throw new Error('useAuthActions must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthActions };
