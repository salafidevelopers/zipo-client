import { useRouter, Router } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../utils/auth';

export default function PublicRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const loggedIn = isLoggedIn();

    if (loggedIn) {
      router.push('/dashboard');
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated) {
    return <>{children}</>;
  } else {
    return <div></div>;
  }
}
