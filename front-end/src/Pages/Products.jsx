import React from 'react';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import productsMock from '../Utils/checkoutPageMocks';

function Products() {
  const allProducts = productsMock;

  return (
    <>
      <NavBar />
      { allProducts.map((product) => (
        <ProductCard productData={ product } key={ product.id } />
      ))}
    </>
  );
}

export default Products;
