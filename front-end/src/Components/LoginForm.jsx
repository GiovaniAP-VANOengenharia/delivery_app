import React, { useState } from 'react';
import styled from 'styled-components';

function LoginForm() {
  const [showPopUp] = useState(false);
  return (
    <FormContainer>
      <label htmlFor="common_login__input-email">
        Login
        <input type="email" data-testid="common_login__input-email" />
      </label>

      <label htmlFor="common_login__input-password">
        Senha
        <input type="password" data-testid="common_login__input-password" />
      </label>

      <button type="submit" data-testid="common_login__button-login">
        LOGIN
      </button>

      <button type="button" data-testid="common_login__button-register">
        Ainda não tenho conta
      </button>
      { showPopUp && (
        <p data-testid="common_login__element-invalid-email">
          Mensagem de Erro
        </p>)}
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  & label {
    display: flex;
    flex-direction: column;
  }
`;

export default LoginForm;
