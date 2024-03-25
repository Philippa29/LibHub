'use client'; 
import React, { useState } from 'react';
import Login from '@/component/login/login'; 
import Register from '@/component/register/register';
import { RegisterProvider } from '@/providers/register';


const loginpages: React.FC = () => {


   



    return (
        
        <RegisterProvider>
            <Login></Login>
        </RegisterProvider>
        

    );
};

export default loginpages;