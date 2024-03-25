'use client'; 
import React, { useState } from 'react';
import Login from '@/component/login/login';
import { AuthProvider } from '@/providers/auth';
import { RegisterProvider } from '@/providers/register';
 



const App: React.FC = () => {


   



    return (
       //<ConfigProvider>
        <RegisterProvider>
        <AuthProvider>
           <Login></Login> 
        </AuthProvider>
        </RegisterProvider>
        
        //</ConfigProvider>
    );
};

export default App;