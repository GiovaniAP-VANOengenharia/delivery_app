import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';

function NavBar() {
  const history = useHistory();
  const { cart } = useContext(MyContext);
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    let cost = 0;
    cart.forEach((product) => {
      cost += Math.round(product.price * product.quantity * 100) / 100;
      cost = Number(cost.toFixed(2));
      setPriceTotal(cost);
    });
  }, [cart]);

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

      <span>{ `Total Price: ${priceTotal}` }</span>

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
