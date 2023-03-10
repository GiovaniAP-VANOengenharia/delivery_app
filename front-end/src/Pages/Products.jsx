import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import MyContext from '../Context/MyContext';
import { requestData } from '../services/requests';
import { calcCartTotal, fixDecimals } from '../Utils';

function Products() {
  const { cart } = useContext(MyContext);
  const [total, setTotal] = useState(0);
  const [productsArray, setProductsArray] = useState([]);

  const fetchProducts = async () => {
    const result = await requestData('/products');
    setProductsArray(result);
  };

  useEffect(() => {
    fetchProducts();
    setTotal(fixDecimals(calcCartTotal(cart)));
  }, []);

  return (
    <div>
      <NavBar />
      <ProductsContainer>
        { productsArray.map((product) => (
          <ProductCard productData={ product } key={ product.id } />
        ))}
      </ProductsContainer>
      <Productsfooter>
        { `Ver Carrinho: R$ ${total}` }
      </Productsfooter>
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

const Productsfooter = styled.div`
  position: fixed;
  top:550px;
  left: 900px;
  background-color: #036b52;
  color: white;
  font-size: 25px;
  padding: 8px 25px;
  border-radius: 5px;
`;

export default Products;
