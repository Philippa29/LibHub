import React, { useReducer, useContext } from "react";
import authReducer from "./reducer";
import {  RegsiterActionsContext, RegsiterStateContext, initialState } from "./context";
import { message } from 'antd';
import { Register, RegisterState } from './interface';
import { useRouter } from "next/navigation";


interface RegisterProviderProps {
  children: React.ReactNode;
}

const RegisterProvider: React.FC<RegisterProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState );
  console.log('state:',  state); 
  const {push} = useRouter();




  const registeruser = async (credentials : Register)=> {
    try{
      const response = await fetch(`${process.env["NEXT_PUBLIC_REG_URL"]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
        body: JSON.stringify({ ...credentials }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      message.success('Registration successful');
    push('/login');
    }
    catch(error) {
      message.error('An error occurred while registering');
    }
  }



  return (
    <RegsiterStateContext.Provider value={state }>
      <RegsiterActionsContext.Provider value={{ registeruser}}>
        {children}
      </RegsiterActionsContext.Provider>
    </RegsiterStateContext.Provider>
  );
};

// Define hooks to access Auth state and actions
const useRegisterState = () => {
  const context = useContext(RegsiterStateContext);
  if (!context) {
    throw new Error('useRegisterState must be used within an AuthProvider');
  }
  return context;
};

const useRegisterActions = () => {
  const context = useContext(RegsiterActionsContext);
  if (!context) {
    throw new Error('useRegisterActions must be used within an AuthProvider');
  }
  return context;
};

export { RegisterProvider, useRegisterState, useRegisterActions};
