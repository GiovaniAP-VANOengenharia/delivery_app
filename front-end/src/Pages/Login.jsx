import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function Login() {
  const { state } = useContext(MyContext);
  return (
    <h1>{state}</h1>
  );
}

export default Login;
