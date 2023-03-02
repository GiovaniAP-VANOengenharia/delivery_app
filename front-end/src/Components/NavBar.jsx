import React from 'react';
import styled from 'styled-components';

function NavBar() {
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
          State.fullName
        </div>

        <div data-testid="customer_products__element-navbar-link-logout">
          Sair
        </div>
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
    & > div:nth-child(2) {
      background-color: #056CF9;
      padding: 20px 40px;
      color: white;
    }
  }
`;

export default NavBar;
