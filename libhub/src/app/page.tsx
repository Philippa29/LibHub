'use client'; 
import React, { useState } from 'react';
import Login from '@/component/login/login';
import { AuthProvider } from '@/providers/auth';
import { RegisterProvider } from '@/providers/register';
import { BookProvider } from '@/providers/book';
 



const App: React.FC = () => {


   



    return (
       //<ConfigProvider>
       <BookProvider>

       
        <RegisterProvider>
        <AuthProvider>
           <Login></Login> 
        </AuthProvider>
        </RegisterProvider>
        </BookProvider>
        //</ConfigProvider>
    );
};

export default App;