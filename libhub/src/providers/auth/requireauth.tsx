'use client'
import React from "react";
import { notFound } from "next/navigation";
 
const WithAuth = (WrappedComponent: React.FC<any>) => {
    // Replace this with your actual authentication logic
    const haveToken = localStorage.getItem("authToken") !== null;
 
    // Define the component to render based on the authentication status
    const AuthComponent: React.FC<any> = (props) => {
        if (haveToken) {
            // If authenticated, render the wrapped component with props
            return <WrappedComponent {...props} />;
        } else {
            // If not authenticated, render a message or a redirection
            return notFound();
        }
    };
 
    return AuthComponent;
};
 
export default WithAuth;

