import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MyContext from '../Context/MyContext';
import { requestAdm } from '../services/requests';
import { emailValidate, nameValidate, passwordValidate } from '../Utils/fieldsValidate';
import RegisterForm from './RegisterForm';
// import { requestRegister } from '../services/requests';
// import { createUserAdm } from '../../../back-end/src/api/services/admin.service';
// import LoginForm from './LoginForm';

function AdminForm() {
  const { register, setRegister } = useContext(MyContext);
  useEffect(
    () => {
      const { name, token, email } = register;
      if (passwordValidate, emailValidate(email, token) && nameValidate(name)) {
        setRegister((prev) => ({ ...prev, submitIsDisable: false }));
      } else setRegister((prev) => ({ ...prev, submitIsDisable: true }));
    },
    [register.email, RegisterForm.token, register.name],
  );

  const handleChange = ({ target: { value, name } }) => {
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    let test = {};
    const request = async () => {
      const { email, token, name, role } = register;
      const { status, date } = await requestAdm({ email, token, name, role });
      test = date;
      const statusNotFound = 409;

      if (status === statusNotFound) {
        setRegister((prev) => ({ ...prev, notFound: true }));
      }
    };
    await request();
  }

  return (
    <form className='form-container'>
      <h1>Cadastro</h1>

      <div className='user-data-container'>
        <label htmlFor='name'>
          Nome:
          <input
            data-testid='admin_manage__input-name'
            placeholder='nome'
            type='text'
            id='name'
            name='name'
            onChange={ handleChange }
          />
        </label>

        <label htmlFor='email'>
          Email:
          <input
            data-testid='admin_manage__input-email'
            placeholder='email@site.com.br'
            type='email'
            id='email'
            name='email'
            onChange={ handleChange }
          />
        </label>

        <label htmlFor='password'>
          Senha:
          <input
            data-testid='admin_manage__input-password'
            placeholder='senha'
            type='password'
            id='password'
            name='password'
            onChange={ handleChange }
          />
        </label>

        <label htmlFor='role'>
            {' '}
            Tipo
            <select
              type='select'
              data-testid='admin_manage__select-role'
              id='role'
              name='role'
              onChange={ handleChange }
            >
              <option value="" selected disabled hidden > </option>
              <option value="seller">Vendedor</option>
              <option value="customer">Cliente</option>
              <option value='administrator'>Administrador</option>
            </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manager__button-register"
          disabled={ register.submitIsDisable }
          onClick={ handleClick }
        >
          CADASTRAR
        </button>
        {
          register.notFound ? (
            <p
              data-testid='common_register__element-invalid_register'
            >
              usuário já existe
            </p>
          ) : null
        };
      </div>
    </form>
  );
}

export default AdminForm;
