import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [state, setState] = useState('ESTADO DO PROVIDER');
  const [cart, setCart] = useState([]);
  const [sale, setSale] = useState([]);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const products = localStorage.getItem('products');
    if (products) {
      const updateCart = JSON.parse(products);
      setCart(updateCart);
    }
  }, []);

  const providerValue = useMemo(() => (
    { state,
      setState,
      cart,
      setCart,
      userId,
      setUserId,
      sale,
      setSale,
      role,
      setRole,
      status,
      setStatus,
      orders,
      setOrders }
  ), [state, cart, userId, sale, role, status, orders]);

  return (
    <MyContext.Provider value={ providerValue }>
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
