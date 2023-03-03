import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [state, setState] = useState('ESTADO DO PROVIDER');
  const [cart, setCart] = useState([]);

  const providerValue = useMemo(() => {
    const products = localStorage.getItem('products');
    if (cart.length > 0) {
      const toLocalStorage = JSON.stringify(cart);
      localStorage.setItem('products', toLocalStorage);
    } else {
      localStorage.removeItem('products');
    }
    if (products && !cart.length) {
      const newCart = JSON.parse(products);
      setCart(newCart);
    }
    return { state, setState, cart, setCart };
  }, [state, setState, cart, setCart]);

  return (
    <MyContext.Provider value={ providerValue }>
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
