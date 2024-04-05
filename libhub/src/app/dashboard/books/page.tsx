'use client'
import React, { useState, useEffect, use, Suspense } from 'react';
import BookComponent from '@/component/bookAdmin/page';
import RequireAuth from '@/providers/auth/requireauth';


const BookDashboard: React.FC = () => {
    return(
           
            <BookComponent />
           
            // </RequireAuth> */}
      
    ); 
};

export default BookDashboard;
