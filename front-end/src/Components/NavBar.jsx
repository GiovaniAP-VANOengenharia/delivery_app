import React from 'react';
import { useHistory } from 'react-router-dom';

function NavBar() {
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <nav>
      <div data-testid="customer_products__element-navbar-link-products">
        Produtos
      </div>

      <div data-testid="customer_products__element-navbar-link-orders">
        Meus Pedidos
      </div>

      <div data-testid="customer_products__element-navbar-user-full-name">
        State.fullName
      </div>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ logOut }
      >
        Sair
      </button>

    </nav>
  );
}

export default NavBar;
