'use client'; 
import React, { useState } from 'react';
import Login from '@/component/login/login';
import { AuthProvider } from '@/providers/auth';
 



const App: React.FC = () => {


   



    return (
       //<ConfigProvider>

        <AuthProvider>
           <Login></Login> 
        </AuthProvider>
        
        //</ConfigProvider>
    );
};

export default App;