import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { verifyPathOrder, verifyPathProducts } from '../Utils/verifyPathNavBar';

function NavBar() {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();

  const logOut = () => {
    localStorage.clear();
    history.push('/login');
  };

  useEffect(() => {
    const { name, role } = JSON.parse(localStorage.getItem('user'));
    setUsername(name);
    setUserRole(role);
  }, []);

  const redirectFunction = ({ target }) => {
    history.push(`/${userRole}/${target.value}`);
  };

  const renderNavButtons = () => {
    if (pathname.includes('seller')) {
      return (
        <p data-testid="customer_products__element-navbar-link-orders">PEDIDOS</p>
      );
    }
    if (pathname.includes('admin')) {
      return (
        <p data-testid="customer_products__element-navbar-link-orders">
          GERENCIAR USUÁRIOS
        </p>
      );
    }
    return (
      <div>
        <button
          type="button"
          onClick={ (e) => redirectFunction(e) }
          value="products"
          data-testid="customer_products__element-navbar-link-products"
          style={ verifyPathProducts(pathname) }
        >
          PRODUTOS
        </button>
        <button
          type="button"
          onClick={ (e) => redirectFunction(e) }
          value="orders"
          data-testid="customer_products__element-navbar-link-orders"
          style={ verifyPathOrder(pathname) }
        >
          MEUS PEDIDOS
        </button>
      </div>
    );
  };

  return (
    <NavbarContainer>
      {renderNavButtons()}
      <div>
        <div data-testid="customer_products__element-navbar-user-full-name">
          {username}
        </div>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logOut }
        >
          Sair
        </button>
      </div>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #036B52;
  height: 64px;
  & > p {
    background-color: #2FC18C;
    padding: 20px 50px;
    font-size: 20px;
    border: 0;
  }
  & > div:nth-child(1) {
    display: flex;
    & > button:nth-child(1) {
    font-size: 20px;
    padding: 20px;
    color: white;
    border: 0;
    background-color: #036B52;
  }
    & > button:nth-child(2) {
    background-color: #2FC18C;
    padding: 20px;
    font-size: 20px;
    border: 0;
  }
  }
  & > div:nth-child(2) {
    display: flex;
    & > div:nth-child(1) {
    background-color: #421981;
    font-size: 20px;
    padding: 20px;
    color: white;
    }
    & > button:nth-child(2) {
      border: 0;
      background-color: #056CF9;
      padding: 20px 40px;
      color: white;
    }
  }
`;

export default NavBar;
