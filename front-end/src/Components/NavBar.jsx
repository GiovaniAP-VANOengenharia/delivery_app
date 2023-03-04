import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { fixDecimals } from '../Utils';
import MyContext from '../Context/MyContext';

function NavBar() {
  const [username, setUsername] = useState('');
  const history = useHistory();
  const { cart } = useContext(MyContext);
  const [priceTotal, setPriceTotal] = useState('');

  useEffect(() => {
    let cost = 0;
    cart.forEach((product) => {
      cost += Math.round(product.price * product.quantity * 100) / 100;
    });
    const total = fixDecimals(cost);
    setPriceTotal(total);
  }, [cart]);

  const logOut = () => {
    localStorage.clear();
    history.push('/login');
  };

  const custumerCheckout = () => {
    history.push('/customer/checkout');
  };

  useEffect(() => {
    const { name } = JSON.parse(localStorage.getItem('user'));
    setUsername(name);
    console.log();
  }, []);

  return (
    <NavbarContainer>
      <div>
        <div data-testid="customer_products__element-navbar-link-products">
          PRODUTOS
        </div>

        <div data-testid="customer_products__element-navbar-link-orders">
          MEUS PEDIDOS
        </div>
      </div>

      <div>
        <div data-testid="customer_products__element-navbar-user-full-name">
          {username}
        </div>

        <button
          type="button"
          onClick={ custumerCheckout }
        >
          { `Total Price: ${priceTotal}` }
        </button>

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
  & > div:nth-child(1) {
    display: flex;
    & > div:nth-child(1) {
    font-size: 20px;
    padding: 20px;
    color: white;
  }
    & > div:nth-child(2) {
    background-color: #2FC18C;
    padding: 20px;
    font-size: 20px;
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
    & > button:nth-child(3) {
      border: 0;
      background-color: #056CF9;
      padding: 20px 40px;
      color: white;
    }
  }
`;

export default NavBar;
