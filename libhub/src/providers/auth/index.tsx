import React, { useReducer, useContext } from "react";
import authReducer from "./reducer";
import { AuthStateContext, AuthActionsContext, initialState } from "./context";
import { message } from 'antd';

interface Credentials {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: Credentials) => {
    try {
      const response = await fetch('https://localhost:44311/api/TokenAuth/Authenticate', {
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
      dispatch({ type: 'LOGIN', payload: result.result.accessToken }); // Update state with the received token
      window.location.href = '/';
      message.success('Login successful');
    } catch (error) {
      window.location.href = '/FetchError';
    }
  };

  const logout = () => {
    // Implement logout logic here
  };

  return (
    <AuthStateContext.Provider value={{ isAuthenticated: state.isAuthenticated, authToken: state.authToken }}>
      <AuthActionsContext.Provider value={{ login, logout }}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};

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
