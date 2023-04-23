import { useRouter, Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../utils/auth';

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const loggedIn = isLoggedIn();

    if (loggedIn) {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, []);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <div></div>;
  }
}
