import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { requestRegister, requestData, setToken } from '../services/requests';
import { emailValidate, nameValidate, passwordValidate } from '../Utils/fieldsValidate';
import AdmTable from './AdmTable';

function AdminForm() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [users, setUsers] = useState([]);
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
      const newUser = await requestRegister('/register/adm', registerFields);
      setUsers([...users, newUser]);
    } catch (error) {
      setShowPopUp(true);
    }
  };

  useEffect(() => {
    const adm = JSON.parse(localStorage.getItem('user'));
    const getUsers = async () => {
      setToken(adm.token);
      const dbUsers = await requestData('/users');
      setUsers(dbUsers.filter((user) => adm.email !== user.email));
    };
    getUsers();
  }, []);

  useEffect(() => {
    const nameIsValid = nameValidate(registerFields.name);
    const emailIsValid = emailValidate(registerFields.email);
    const passwordIsValid = passwordValidate(registerFields.password);
    setIsDisabled(!(emailIsValid && passwordIsValid && nameIsValid));
  }, [registerFields]);

  return (
    <AdmContainer>
      <h1>Cadastrar novo usuário</h1>
      <AdmHeader>

        <label htmlFor="name">
          Nome
          <input
            id="name"
            onChange={ handleChange }
            type="text"
            data-testid="admin_manage__input-name"
          />
        </label>

        <label htmlFor="email">
          Login
          <input
            id="email"
            onChange={ handleChange }
            type="email"
            data-testid="admin_manage__input-email"
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            id="password"
            onChange={ handleChange }
            type="password"
            data-testid="admin_manage__input-password"
          />
        </label>

        <label htmlFor="role">
          Tipo
          <select
            type="select"
            data-testid="admin_manage__select-role"
            id="role"
            name="role"
            onChange={ handleChange }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>

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
      <AdmTable users={ users } setUsers={ setUsers } />
    </AdmContainer>
  );
}

const AdmContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  h1 {
    width: 90%;
  }
`;

const AdmHeader = styled.div`
  height: 100%;
  width: 90%;
  margin-left: 4px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #B1C2BE;
  border-radius: 8px;
  & > label {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 0;
    font-size: 20px;
    font-weight: 500;
    width: 20%;
    margin: 10px;
    border-radius: 5px;
    & >:nth-child(1){
      margin: 0 5px 0 0;
    }
    & > input, select {
      height: 35px;
      font-size: 20px;
    }
  }
    & > div > button {
      width: 150px;
      padding: 6px;
      margin-right: 10px;
      border-radius: 5px;
      border: none;
      font-size: 20px;
      color: white;
      background-color: #036B52;
      :disabled {
      background-color: #036b5352;
      color: white
      }
    }
  & > p:nth-child(2) {
    font-size: 20px;
    margin: 0;
  }
`;

export default AdminForm;
