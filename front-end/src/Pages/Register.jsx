import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../Components/RegisterForm';

function Register() {
  return (
    <RegisterContainer>
      <h1>Cadastro</h1>
      <RegisterForm />
    </RegisterContainer>
  );
}

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Register;
