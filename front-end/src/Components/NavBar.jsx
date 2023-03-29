import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MyContext from '../Context/MyContext';
import moon from '../images/Moon.png';
import sun from '../images/Sun.png';
import { verifyPathOrder, verifyPathProducts } from '../Utils/verifyPathNavBar';

function NavBar() {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [darkMode, setDarkMode] = useState(moon);
  const { theme, setTheme } = useContext(MyContext);
  const history = useHistory();
  const { pathname } = useLocation();

  const logOut = () => {
    localStorage.clear();
    localStorage.setItem('theme', theme);
    history.push('/login');
  };

  useEffect(() => {
    const { name, role } = JSON.parse(localStorage.getItem('user'));
    setUsername(name);
    setUserRole(role);
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') {
      setDarkMode(sun);
      setTheme('dark');
    }
  }, []);

  const redirectFunction = ({ target }) => {
    history.push(`/${userRole}/${target.value}`);
  };

  const darkModeHandle = () => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setDarkMode(moon);
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setDarkMode(sun);
      setTheme('dark');
    }
  };

  const renderNavButtons = () => {
    if (pathname.includes('seller')) {
      return (
        <button
          type="button"
          onClick={ (e) => redirectFunction(e) }
          value="orders"
          className="orders all"
          data-testid="customer_products__element-navbar-link-orders"
        >
          PEDIDOS
        </button>
      );
    }
    if (pathname.includes('admin')) {
      return (
        <p
          data-testid="customer_products__element-navbar-link-orders"
          className="all"
        >
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
          className="products"
          data-testid="customer_products__element-navbar-link-products"
          style={ verifyPathProducts(pathname) }
        >
          PRODUTOS
        </button>
        <button
          type="button"
          onClick={ (e) => redirectFunction(e) }
          value="orders"
          className="orders"
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
        <button
          type="button"
          data-testid="customer_products__element-navbar-theme"
          className="theme"
          onClick={ () => darkModeHandle() }
        >
          <img src={ darkMode } alt="" />
        </button>

        <div
          data-testid="customer_products__element-navbar-user-full-name"
          className="user-name"
        >
          {username}
        </div>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          className="exit"
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
  width: 100%;
  .orders {
    background-color: #2FC18C;
    padding: 20px 50px;
    font-size: 20px;
    color: black;
  }
  & > div:nth-child(1) {
    display: flex;
    & > .products {
      font-size: 20px;
      padding: 20px;
      color: white;
      border: 0;
      background-color: #036B52;
    }
    & > .orders {
      background-color: #2FC18C;
      padding: 20px;
      font-size: 20px;
      border: 0;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    height: 100%;
    & > .theme {
      width: 50px;
      height: 70%;
      margin: 10px;
      border-radius: 5px;
      background: none;
      img {
        width: 100%;
        height: 100%;
      }
    }
    & > .user-name {
    background-color: #421981;
    font-size: 20px;
    padding: 20px;
    color: white;
    }
    & > .exit {
      border: solid 1px #056CF9;
      background-color: #056CF9;
      padding: 20px 40px;
      color: white;
    }
  }
`;

export default NavBar;
