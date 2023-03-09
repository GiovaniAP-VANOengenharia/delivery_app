import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { fixDecimals } from '../Utils';
import MyContext from '../Context/MyContext';
import { verifyPathOrder, verifyPathProducts } from '../Utils/verifyPathNavBar';

function NavBar() {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const history = useHistory();
  const { cart, setCart } = useContext(MyContext);
  const [priceTotal, setPriceTotal] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const products = localStorage.getItem('products');
    if (!products) {
      setIsDisabled(true);
      setPriceTotal(fixDecimals(0));
    }
  }, []);

  useEffect(() => {
    if (!cart.length) {
      setIsDisabled(true);
      setPriceTotal(fixDecimals(0));
    } else {
      setIsDisabled(false);
      let cost = 0;
      cart.forEach((product) => {
        cost += Math.round(product.price * product.quantity * 100) / 100;
      });
      const total = fixDecimals(cost);
      setPriceTotal(total);
    }
  }, [cart]);

  const logOut = () => {
    localStorage.clear();
    setCart([]);
    history.push('/login');
  };

  const custumerCheckout = () => {
    history.push('/customer/checkout');
  };

  useEffect(() => {
    const { name, role } = JSON.parse(localStorage.getItem('user'));
    setUsername(name);
    setUserRole(role);
  }, []);

  const redirectFunction = ({ target }) => {
    history.push(`/${userRole}/${target.value}`);
  };

  return (
    <NavbarContainer>
      <div>
        <button
          type="button"
          onClick={ (e) => redirectFunction(e) }
          value="products"
          data-testid="customer_products__element-navbar-link-products"
          style={ verifyPathProducts(pathname) }
        >
          Produtos
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

      <div>
        <div data-testid="customer_products__element-navbar-user-full-name">
          {username}
        </div>

        <button
          type="button"
          onClick={ custumerCheckout }
          disabled={ isDisabled }
          data-testid="customer_products__button-cart"
        >
          <p data-testid="customer_products__checkout-bottom-value">
            {priceTotal.toString().replace('.', ',')}
          </p>
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
    & > button:nth-child(3) {
      border: 0;
      background-color: #056CF9;
      padding: 20px 40px;
      color: white;
    }
  }
`;

export default NavBar;
