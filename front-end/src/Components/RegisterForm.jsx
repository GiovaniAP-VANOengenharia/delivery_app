import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MyContext from '../Context/MyContext';
import { requestRegister } from '../services/requests';
import { emailValidate, nameValidate, passwordValidate } from '../Utils/fieldsValidate';

function RegisterForm() {
  const { setUserId } = useContext(MyContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [registerFields, setRegisterFields] = useState({
    name: '',
    email: '',
    password: '',
  });
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setRegisterFields({
      ...registerFields,
      [id]: value,
    });
  };
  const handleClickRegisterBtn = async () => {
    try {
      const register = await requestRegister('/register', registerFields);
      if (register.result) {
        const { id, name, email, role, token } = register.result;
        const toLocalStorage = JSON.stringify({ name, email, role, token });
        localStorage.setItem('user', toLocalStorage);
        setUserId(id);
        history.push('/customer/products');
      }
    } catch (error) {
      setShowPopUp(true);
    }
  };

  useEffect(() => {
    const nameIsValid = nameValidate(registerFields.name);
    const emailIsValid = emailValidate(registerFields.email);
    const passwordIsValid = passwordValidate(registerFields.password);
    setIsDisabled(!(emailIsValid && passwordIsValid && nameIsValid));
  }, [registerFields]);

  return (
    <div>
      <FormContainer>
        <label htmlFor="common_register__input-name">
          Nome
          <input
            id="name"
            onChange={ handleChange }
            type="text"
            data-testid="common_register__input-name"
          />
        </label>

        <label htmlFor="common_register__input-email">
          Login
          <input
            id="email"
            onChange={ handleChange }
            type="email"
            data-testid="common_register__input-email"
          />
        </label>

        <label htmlFor="common_register__input-password">
          Senha
          <input
            id="password"
            onChange={ handleChange }
            type="password"
            data-testid="common_register__input-password"
          />
        </label>

        <button
          disabled={ isDisabled }
          onClick={ () => handleClickRegisterBtn() }
          type="submit"
          data-testid="common_register__button-register"
        >
          CADASTRAR
        </button>

      </FormContainer>
      { showPopUp && (
        <p
          data-testid="common_register__element-invalid_register"
          style={ { textAlign: 'center' } }
        >
          Email já utilizado
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
  & > :nth-child(4) {
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
`;

export default RegisterForm;
