import React, { FC, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from './index';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated } = useAuthState();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
