import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import MyContext from '../Context/MyContext';
import { requestData } from '../services/requests';
import { fixDecimals } from '../Utils';

function Products() {
  const { cart } = useContext(MyContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsArray, setProductsArray] = useState([]);

  const history = useHistory();

  const fetchProducts = async () => {
    const result = await requestData('/products');
    setProductsArray(result);
  };

  const customerCheckout = () => {
    history.push('/customer/checkout');
  };

  useEffect(() => {
    fetchProducts();
    let cost = 0;
    cart.forEach((product) => {
      cost += Math.round(product.price * product.quantity * 100) / 100;
    });
    const total = fixDecimals(cost);
    setTotalPrice(total);
  }, [cart]);

  return (
    <div>
      <NavBar />
      <ProductsContainer>
        { productsArray.map((product) => (
          <ProductCard productData={ product } key={ product.id } />
        ))}
      </ProductsContainer>
      <Productsfooter
        data-testid="customer_products__button-cart"
        onClick={ customerCheckout }
        disabled={ !cart.length }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          { `Ver Carrinho: R$ ${totalPrice}` }
        </p>
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

const Productsfooter = styled.button`
  position: fixed;
  top:900px;
  left: 1500px;
  background-color: #036b52;
  color: white;
  font-size: 25px;
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  & > p {
    padding: 0;
    margin: 0;
  }
  &:disabled {
      background-color: #036b5352;
      color: white
  }
`;

export default Products;
