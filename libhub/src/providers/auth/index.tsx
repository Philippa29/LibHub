import React, { useReducer, useContext } from "react";
import authReducer from "./reducer";
import { AuthStateContext, AuthActionsContext, initialState } from "./context";
import { message } from 'antd';
import { Credentials } from './interface';
import { useRouter } from "next/navigation";
import axios from "axios";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const {push} = useRouter();


  const login = async (credentials: Credentials) => {
    console.log("here"); 
    try {
      console.log("here inside ", credentials); 
      const response = await axios.post(`${process.env["NEXT_PUBLIC_AUTH_URL"]}`, credentials, {
        headers: {
          'Content-Type': 'application/json-patch+json'
        }
      });
      console.log("response", response.data)
      if (response.status === 200) { // Fixed conditional statement
        console.log(response.data.result.accessToken);
        dispatch({ type: 'LOGIN', payload: response.data.result.accessToken });
        console.log('state:', state.authToken);
        localStorage.setItem('authToken', response.data.result.accessToken);
        message.success('Login successful');
        push('/dashboard');
      } else {
        throw new Error('Network response was not ok');
      }

      //const result = await response.json();


             if (!response.data.ok) {
        throw new Error('Network response was not ok')
      }
    } 
    catch (err) {
      console.error("Login error:", err); 
      if ((err as any).response && (err as any).response.status === 500) {
        // Internal server error occurred
        message.error('Internal server error. Please try again later.');
      } else {
        // Other error occurred
        message.error('An error occurred while logging in');
      }
    }

   
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
      <AuthActionsContext.Provider value={{ login, logout}}>
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
