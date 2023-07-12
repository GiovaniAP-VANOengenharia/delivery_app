import React from 'react';
import styled from 'styled-components';
import LoginForm from '../Components/LoginForm';
import delivery from '../images/Delivery.png';

function Login() {
  return (
    <LoginContainer>
      <LogoContainer>
        <img alt="logoApp" src={ delivery } />
        <h1>IBeer</h1>
      </LogoContainer>
      <LoginForm />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > img {
      width: 400px;
      margin: 0;
      padding: 0;
    }
  & > h1 {
      margin: 0;
    }
`;

export default Login;
