'use client'; 
import React, { useState } from 'react';
import Login from '@/component/login/login';
import { AuthProvider } from '@/providers/auth';
import { RegisterProvider } from '@/providers/register';
import { BookProvider } from '@/providers/book';
import { BookRequestProvider } from '@/providers/bookrequest';
 



const App: React.FC = () => {


   



    return (
       //<ConfigProvider>
       <BookRequestProvider>

       
       <BookProvider>

       
        <RegisterProvider>
        <AuthProvider>
           <Login></Login> 
        </AuthProvider>
        </RegisterProvider>
        </BookProvider>
        </BookRequestProvider>
        //</ConfigProvider>
    );
};

export default App;