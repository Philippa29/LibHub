import React from 'react';
import { useAuthState } from './index';
import { Navigate, RouteProps } from 'react-router-dom';

// Adjust AuthenticatedComponentProps to extend RouteProps
interface AuthenticatedComponentProps {


}

const RequireAuth = <P extends AuthenticatedComponentProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const isAuthenticated = useAuthState(); // Assuming this returns a boolean

    console.log("isAuthenticated", isAuthenticated);

    const authToken = window.localStorage.getItem('authToken');

    if (!authToken || !isAuthenticated) {
      // Redirect to the login page or handle unauthorized access
      return <Navigate to="/dashboard" />;
    }

    return <WrappedComponent {...props } />;
  };

  return AuthenticatedComponent;
};

export default RequireAuth;

