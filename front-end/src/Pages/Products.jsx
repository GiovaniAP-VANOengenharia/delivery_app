import React, { useContext } from 'react';
import NavBar from '../Components/NavBar';
import MyContext from '../Context/MyContext';

function Products() {
  const { state } = useContext(MyContext);
  return (
    <NavBar />
  );
}

export default Products;
