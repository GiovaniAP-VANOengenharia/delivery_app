import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function NavBar() {
  const { state } = useContext(MyContext);
  return (
    <nav>
      <div data-testid='customer_products__element-navbar-link-products'>
        Produtos
      </div>

      <div data-testid='customer_products__element-navbar-link-orders'>
        Meus Pedidos
      </div>

      <div data-testid='customer_products__element-navbar-user-full-name'>
        State.fullName
      </div>

      <div data-testid='customer_products__element-navbar-link-logout'>
        Sair
      </div>

    </nav>
  );
}

export default NavBar;
