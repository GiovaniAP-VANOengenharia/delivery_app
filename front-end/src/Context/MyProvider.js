import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [state, setState] = useState('ESTADO DO PROVIDER');
  const [cart, setCart] = useState([]);

  const providerValue = useMemo(() => (
    { state, setState, cart, setCart }
  ), [state, setState, cart, setCart]);

  return (
    <MyContext.Provider value={ providerValue }>
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
