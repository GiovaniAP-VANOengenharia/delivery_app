import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import { requestData } from '../services/requests';

function Products() {
  const [productsArray, setProductsArray] = useState([]);

  const fetchProducts = async () => {
    const result = await requestData('/products');
    setProductsArray(result);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <NavBar />
      { productsArray.map((product) => (
        <ProductCard productData={ product } key={ product.id } />
      ))}
      <div>
        Ver Carrinho: R$ !valorTotal!
      </div>
    </>
  );
}

export default Products;
