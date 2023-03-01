import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { emailValidate, nameValidate, passwordValidate } from '../Utils/fieldsValidate';

function RegisterForm() {
  const [showPopUp] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [registerFields, setRegisterFields] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setRegisterFields({
      ...registerFields,
      [id]: value,
    });
  };
  // const handleClickLoginBtn = async () => {
  //   try {
  //     const test = await requestLogin('/login', loginFields);
  //     console.log(test);
  //   } catch (error) {
  //     setShowPopUp(true);
  //   }
  // };

  // const handleClickRegisterBtn = () => {
  //   history.push('/register');
  // };

  useEffect(() => {
    const nameIsValid = nameValidate(registerFields.name);
    const emailIsValid = emailValidate(registerFields.email);
    const passwordIsValid = passwordValidate(registerFields.password);
    setIsDisabled(!(emailIsValid && passwordIsValid && nameIsValid));
  }, [registerFields]);

  return (
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
        onClick={ () => handleClickLoginBtn() }
        type="submit"
        data-testid="common_register__button-register"
      >
        CADASTRAR
      </button>

      { showPopUp && (
        <p data-testid="common_register__element-invalid_register">
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

export default RegisterForm;
