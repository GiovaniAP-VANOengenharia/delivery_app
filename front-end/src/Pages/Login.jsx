import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
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
    <LoginContainer>
      <LogoContainer>
        <img alt="logoApp" src="https://img.freepik.com/vetores-gratis/entregador-de-comida-andando-de-motocicleta-ilustracao-da-arte-dos-desenhos-animados_56104-610.jpg?w=1060&t=st=1678220871~exp=1678221471~hmac=00a371b25b1434662fcd45d47ae6e0716e0ae6ec2e79aabb6d4662601e24481e" />
        <h1>Delivery App</h1>
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
