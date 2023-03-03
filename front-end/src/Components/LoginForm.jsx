import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../services/requests';
import { emailValidate, passwordValidate } from '../Utils/fieldsValidate';

function LoginForm() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginFields, setLoginFields] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setLoginFields({
      ...loginFields,
      [id]: value,
    });
  };
  const handleClickLoginBtn = async () => {
    try {
      const login = await requestLogin('/login', loginFields);
      if (login.result) {
        const toLocalStorage = JSON.stringify(login.result);
        localStorage.setItem('login', toLocalStorage);
        history.push('/customer/products');
      }
    } catch (error) {
      setShowPopUp(true);
    }
  };

  const handleClickRegisterBtn = () => {
    history.push('/register');
  };

  useEffect(() => {
    const emailIsValid = emailValidate(loginFields.email);
    const passwordIsValid = passwordValidate(loginFields.password);
    setIsDisabled(!(emailIsValid && passwordIsValid));
  }, [loginFields]);
  return (
    <FormContainer>
      <label htmlFor="common_login__input-email">
        Login
        <input
          id="email"
          onChange={ handleChange }
          type="email"
          data-testid="common_login__input-email"
        />
      </label>

      <label htmlFor="common_login__input-password">
        Senha
        <input
          id="password"
          onChange={ handleChange }
          type="password"
          data-testid="common_login__input-password"
        />
      </label>

      <button
        disabled={ isDisabled }
        onClick={ () => handleClickLoginBtn() }
        type="submit"
        data-testid="common_login__button-login"
      >
        LOGIN
      </button>

      <button
        onClick={ () => handleClickRegisterBtn() }
        type="button"
        data-testid="common_login__button-register"
      >
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
