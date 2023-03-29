import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import MyContext from '../Context/MyContext';
import { requestData } from '../services/requests';
import { fixDecimals } from '../Utils';
import { lightTheme, darkTheme } from '../theme';
import GlobalStyle from '../theme/GlobalStyle';

function Products() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsArray, setProductsArray] = useState([]);
  const { theme, cart, setCart } = useContext(MyContext);

  const history = useHistory();

  const fetchProducts = async () => {
    const result = await requestData('/products');
    setProductsArray(result);
  };

  const customerCheckout = () => {
    history.push('/customer/checkout');
  };

  useEffect(() => {
    const products = localStorage.getItem('products');
    if (!products) setCart([]);
  }, []);

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
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
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
    </ThemeProvider>
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
  top:550px;
  left: 900px;
  background-color: #036b52;
  color: white;
  font-size: 25px;
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  & > p {
    padding: 0;
    margin: 0;
    color: white;
  }
  &:disabled {
      background-color: #036b5352;
      color: white
  }
`;

export default Products;
