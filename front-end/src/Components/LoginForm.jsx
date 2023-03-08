import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import { requestLogin } from '../services/requests';
import { emailValidate, passwordValidate } from '../Utils/fieldsValidate';

function LoginForm() {
  const { setUserId } = useContext(MyContext);
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
        const { id, name, email, role, token } = login.result;
        const toLocalStorage = JSON.stringify({ name, email, role, token });
        localStorage.setItem('user', toLocalStorage);
        setUserId(id);
        if (role === 'customer') history.push('/customer/products');
        if (role === 'seller') history.push('/seller/orders');
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
    <div>
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
      </FormContainer>
      { showPopUp && (
        <p
          data-testid="common_login__element-invalid-email"
          style={ { textAlign: 'center' } }
        >
          Login ou senha inválidos
        </p>)}
    </div>
  );
}

const FormContainer = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  border: 1px solid #CBD4D2;
  padding: 35px 20px;
  background-color: #EAF1EF;
  margin-top: 10px;
  & > label {
    display: flex;
    flex-direction: column;
  }
  & > label > input {
    padding: 10px;
    width: 250px;
    margin: 7px 0;
    border-radius: 3px;
  }
  & > :nth-child(3) {
    &:disabled {
      background-color: #036b5352;
      color: white
    }
    margin: 6px 0;
    width: 270px;
    padding: 10px;
    background-color: #036B52;
    color: white;
    border-radius: 3px;
    border: 1px solid #036B52;
  }
  & > :nth-child(4) {
    width: 270px;
    padding: 10px;
    color: #036B52;
    border-radius: 3px;
    border: 1px solid #036B52;
  }
`;

export default LoginForm;
