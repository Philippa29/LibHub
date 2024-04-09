'use client'
import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import { UserActionsContext, UserStateContext, initialState } from './context';
import { getUserByIdReducer } from './reducer';
import { userReducer } from './reducer';
import { UserState } from './interface';

// Define interface for UserProps
interface UserProps {
  children: React.ReactNode;
}

// Define UserProvider component
const UserProvider: React.FC<UserProps> = ({ children }) => {
  // Define initial state


  // Use useReducer hook with correct reducer function and initial state
  const [state, dispatch] = useReducer(getUserByIdReducer, initialState);

  // Define async function to fetch users
  const getUser = async () => {
    console.log("inside get user");
    try {
      const response = await axios.get('https://localhost:44311/api/services/app/Student/GetAllStudents');
      return response.data.result;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getUserById = async (id: string) => {
    try {
      const response = await axios.get(`https://localhost:44311/api/services/app/User/GetUserById?Id=${id}`);
      return response.data.result;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const getUserCount = async () => {
    try {
      const response = await axios.get('https://localhost:44311/api/services/app/Student/GetUserCount');
      return response.data.result;
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const getUsersLoan = async () => {
    try {
      const response = await axios.get('https://localhost:44311/api/services/app/Loan/GetLoansByStudentId');
      return response.data.result;
    } catch (error) {
      console.error('Error fetching user loans:', error);
    }
  };

    const getUsersBookRequests = async () => {
        try {
        const response = await axios.get('https://localhost:44311/api/services/app/BookRequest/GetBookRequestbyStudentId');
        return response.data.result;
        } catch (error) {
        console.error('Error fetching user book requests:', error);
        }
    };

  // Return UserStateContext.Provider and UserActionsContext.Provider
  return (
    <UserStateContext.Provider value={state}>
      <UserActionsContext.Provider value={{ getUser , getUserById, getUserCount, getUsersLoan , getUsersBookRequests }}>
        {children}
      </UserActionsContext.Provider>
    </UserStateContext.Provider>
  );
};

// Define custom hook useUserState
const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

// Define custom hook useUserActions
const useUserActions = () => {
  const context = useContext(UserActionsContext);
  if (context === undefined) {
    throw new Error('useUserActions must be used within a UserProvider');
  }
  return context;
};

// Export UserProvider, useUserState, and useUserActions
export { UserProvider, useUserState, useUserActions };
