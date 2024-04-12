'use client'
import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import { UserActionsContext, UserStateContext, initialState } from './context';
import { getUserByIdReducer } from './reducer';

import { userReducer } from './reducer';
import { UserState } from './interface';
import { getLoansAction } from '../loan/action';
import { LoansReducer } from '../loan/reducer';
import { initialLoanState } from '../loan/context';
import { BookRequestReducer } from '../bookrequest/reducer';
import { initialBookRequestState } from '../bookrequest/context';
import { getBookRequestAction } from '../bookrequest/action';

// Define interface for UserProps
interface UserProps {
  children: React.ReactNode;
}

// Define UserProvider component
const UserProvider: React.FC<UserProps> = ({ children }) => {
  // Define initial state


  // Use useReducer hook with correct reducer function and initial state
  const [state, dispatch] = useReducer(getUserByIdReducer, initialState);
  const [stateLoan, dispatchLoan] = useReducer(LoansReducer, initialLoanState); 
  const [stateBookRequest, dispatchBookRequest] = useReducer(BookRequestReducer, initialBookRequestState);
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
    console.log("Before response in the provider");
    try {
      const response = await axios.get('https://localhost:44311/api/services/app/Loan/GetLoansByStudentId',{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    });
    console.log("response in the provider: ", response.data.result);
    dispatchLoan(getLoansAction(response.data.result)); 
      return response.data.result;
    } catch (error) {
      console.error('Error fetching user loans:', error);
    }
  };

    const getUsersBookRequests = async () => {
        try {
        const response = await axios.get('https://localhost:44311/api/services/app/BookRequest/GetBookRequestbyStudentId',{
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
          }
      });
        dispatchBookRequest(getBookRequestAction(response.data.result));
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
