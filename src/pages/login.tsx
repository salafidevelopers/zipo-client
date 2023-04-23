import React from 'react';
import dynamic from 'next/dynamic';

const LoginPage = dynamic(() => import('../components/login'), {
  ssr: false,
});

function Login() {
  return <LoginPage />;
}

export default Login;
