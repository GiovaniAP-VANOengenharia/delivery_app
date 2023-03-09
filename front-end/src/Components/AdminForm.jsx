import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import { requestRegister, setToken } from '../services/requests';
import { emailValidate, nameValidate, passwordValidate } from '../Utils/fieldsValidate';

function AdminForm() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [registerFields, setRegisterFields] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setRegisterFields({
      ...registerFields,
      [id]: value,
    });
  };

  const handleClickRegisterBtn = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    try {
      setToken(token);
      await requestRegister('/register/adm', registerFields);
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
      <div>
        <label htmlFor="admin_manage__input-name">
          Nome
          <input
            id="name"
            onChange={ handleChange }
            type="text"
            data-testid="admin_manage__input-name"
          />
        </label>

        <label htmlFor="admin_manage__input-email">
          Login
          <input
            id="email"
            onChange={ handleChange }
            type="email"
            data-testid="admin_manage__input-email"
          />
        </label>

        <label htmlFor="admin_manage__input-password">
          Senha
          <input
            id="password"
            onChange={ handleChange }
            type="password"
            data-testid="admin_manage__input-password"
          />
        </label>

        <label htmlFor="admin_manage__select-role">
          <select
            type="select"
            data-testid="admin_manage__select-role"
            id="role"
            name="role"
            onChange={ handleChange }
          >
            <option value="" selected disabled hidden> </option>
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>

        <button
          disabled={ isDisabled }
          onClick={ () => handleClickRegisterBtn() }
          type="button"
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>

      </div>
      { showPopUp && (
        <p
          data-testid="admin_manage__element-invalid_register"
          style={ { textAlign: 'center' } }
        >
          Email já utilizado
        </p>)}
    </div>
  );
}

// const FormContainer = styled.div`
//   display: flex;
//   width: fit-content;
//   flex-direction: column;
//   border: 1px solid #CBD4D2;
//   padding: 35px 20px;
//   background-color: #EAF1EF;
//   & > label {
//     display: flex;
//     flex-direction: column;
//   }
//   & > label > input {
//     padding: 10px;
//     width: 250px;
//     margin: 7px 0;
//     border-radius: 3px;
//   }
//   & > :nth-child(4) {
//     &:disabled {
//       background-color: #036b5352;
//       color: white
//     }
//     margin: 6px 0;
//     width: 270px;
//     padding: 10px;
//     background-color: #036B52;
//     color: white;
//     border-radius: 3px;
//     border: 1px solid #036B52;
//   }
// `;

export default AdminForm;
