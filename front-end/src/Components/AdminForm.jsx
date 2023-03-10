import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
    setIsDisabled(!(emailIsValid && passwordIsValid && nameIsValid && registerFields.role));
  }, [registerFields]);

  return (
    <AdmContainer>
      <AdmHeader>
        <div>
          <label htmlFor="admin_manage__input-name">
            Nome
          </label>
          <input
            id="name"
            onChange={ handleChange }
            type="text"
            data-testid="admin_manage__input-name"
          />

        </div>

        <div>
          <label htmlFor="admin_manage__input-email">
            Login
          </label>
          <input
            id="email"
            onChange={ handleChange }
            type="email"
            data-testid="admin_manage__input-email"
          />
        </div>

        <div>
          <label htmlFor="admin_manage__input-password">
            Senha
          </label>
          <input
            id="password"
            onChange={ handleChange }
            type="password"
            data-testid="admin_manage__input-password"
          />
        </div>

        <div>
          <label htmlFor="admin_manage__select-role" />
          Tipo
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
        </div>

        <div>
          <button
            disabled={ isDisabled }
            onClick={ () => handleClickRegisterBtn() }
            type="button"
            data-testid="admin_manage__button-register"
          >
            CADASTRAR
          </button>
        </div>

      </AdmHeader>
      { showPopUp && (
        <p
          data-testid="admin_manage__element-invalid_register"
          style={ { textAlign: 'center' } }
        >
          Email já utilizado
        </p>)}
    </AdmContainer>
  );
}

const AdmContainer = styled.div`
  margin: 20px 50px;
  border: 1px solid black;
  height: 80px;
`;

const AdmHeader = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #B1C2BE;
  background-color: #EAF1EF;
  & > div {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 0;
    font-size: 20px;
    font-weight: 500;
    width: 15%;
    margin: 10px;
    border-radius: 5px;
    & >:nth-child(1){
      margin: 0 5px 0 0;
    }
    & > button {
      background-color: #036b52;
      color: white;
      height: 40px;
    }
    & > input, select {
      height: 30px;
    }
  }
  & > p:nth-child(2) {
    font-size: 20px;
    margin: 0;
  }
`;

export default AdminForm;
