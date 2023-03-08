import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
    <div>
      <NavBar />
      <ProductsContainer>
        { productsArray.map((product) => (
          <ProductCard productData={ product } key={ product.id } />
        ))}
      </ProductsContainer>
      <div>
        Ver Carrinho: R$ !valorTotal!
      </div>
    </div>
  );
}

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  margin: 50px;
`;

export default Products;
