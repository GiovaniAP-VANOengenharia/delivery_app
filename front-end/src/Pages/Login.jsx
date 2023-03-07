import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';

function Login() {
  const history = useHistory();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      history.push('/customer/products');
    }
  }, []);
  return (
    <LoginForm />
  );
}

export default Login;
