'use client'
import React, { ComponentType, FC } from 'react';
import { useAuthState } from './index';
import { useRouter } from 'next/navigation';

export const RequireAuth = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const router = useRouter();
  const WrappedComponent: FC<P> = (props) => {
    const isAuthenticated = useAuthState(); // Assuming this returns a boolean
    console.log("isAuthenticated", isAuthenticated);
    const authToken = window.localStorage.getItem('authToken');

    if (!authToken || !isAuthenticated) {
      // Redirect to the login page or handle unauthorized access
      router.push("/login");
      return null; // Return null when redirecting
    }

    // Render the wrapped component if authenticated
    return <Component {...props} />;
  };

  return WrappedComponent;
};




