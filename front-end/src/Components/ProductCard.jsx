import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MyContext from '../Context/MyContext';

function ProductCard(props) {
  const [quantity, setQuantity] = useState(0);
  const { setCart } = useContext(MyContext);
  const { productData } = props;
  const { id, name, price, urlImage } = productData;

  const toCart = useCallback(() => {
    const products = localStorage.getItem('products');
    let items = [];
    let findItem = '';
    if (products) {
      items = JSON.parse(products);
      findItem = items.find((product) => product.id === id);
    }
    if (products && !findItem && quantity > 0) {
      const newCart = [...items, { id, name, price, quantity }];
      const toLocalStorage = JSON.stringify(newCart);
      localStorage.setItem('products', toLocalStorage);
      setCart(newCart);
    }
    if (findItem && quantity > 0) {
      const newItem = { ...findItem, quantity };
      const filterCart = items.filter((product) => product.id !== id);
      const newCart = [...filterCart, newItem];
      const toLocalStorage = JSON.stringify(newCart);
      localStorage.setItem('products', toLocalStorage);
      setCart(newCart);
    }
    if (!products && quantity > 0) {
      const toLocalStorage = JSON.stringify([{ id, name, price, quantity }]);
      localStorage.setItem('products', toLocalStorage);
      setCart([{ id, name, price, quantity }]);
    }
    if (findItem && !quantity) {
      const newCart = items.filter((product) => product.id !== id);
      if (!newCart.length) localStorage.removeItem('products');
      else {
        const toLocalStorage = JSON.stringify(newCart);
        localStorage.setItem('products', toLocalStorage);
      }
      setCart(newCart);
    }
  }, [quantity]);

  const inputQuantity = (e) => {
    if (e.target.name === 'add') {
      setQuantity(quantity + 1);
    } else if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    const products = localStorage.getItem('products');
    let findItem = '';
    if (products) {
      const cart = JSON.parse(products);
      findItem = cart.find((product) => product.id === id);
    }
    if (findItem) setQuantity(findItem.quantity);
  }, []);

  useEffect(() => {
    if (quantity < 0) setQuantity(0);
    toCart();
  }, [quantity]);

  const inputChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <ProductCardContainer>
      <div>
        <p>R$</p>
        <div data-testid={ `customer_products__element-card-price-${id}` }>
          {price.toString().replace('.', ',')}
        </div>
      </div>

      <img
        src={ urlImage }
        alt="Imagem do Produto"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <NameAndQtdContainer>
        <div data-testid={ `customer_products__element-card-title-${id}` }>
          { name }
        </div>
        <div>
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            name="add"
            onClick={ (e) => inputQuantity(e) }
          >
            +
          </button>

          <input
            type="number"
            value={ quantity }
            data-testid={ `customer_products__input-card-quantity-${id}` }
            onChange={ (e) => inputChange(e) }
          />

          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            name="sub"
            onClick={ (e) => inputQuantity(e) }
          >
            -
          </button>
        </div>

      </NameAndQtdContainer>
    </ProductCardContainer>
  );
}

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #CBD4D2;
  margin: 15px;
  width: 350px;
  p {
    color: black;
  }
  & > img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
  & > div:first-child {
    display: flex;
    flex-direction: row;
    font-size: 25px;
    font-weight: 600;
    text-align: left;
    margin-right: 200px;
    margin-bottom: 350px;
    padding: 8px;
    background-color: #F6FFFD;
    border-radius: 5px;
    position: absolute;
    & > p {
      margin: 0 5px 0 0;
    }
  }
`;

const NameAndQtdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  flex-direction: column;
  width: 100%;
  height: 80px;
  padding-bottom: 15px;
  background-color: #EAF1EF;
  & > div:nth-child(1) {
    margin: 10px;
  }
  & > div:nth-child(2) {
    display: flex;
  }
  & > div > button {
    font-size: 20px;
    width: 35px;
    height: 35px;
    color: white;
    background-color: #036B52;
    border: unset;
  }
  & > div > button:nth-child(1) {
    border-radius: 10px 0 0 10px;
  }
  & > div > button:nth-child(3) {
    border-radius: 0 10px 10px 0;
  }
  & > div > input {
    width: 50px;
    margin: 0;
    padding: 0;
    border: 1px solid #036B52;
    text-align: center;
    font-size: 20px;
    /* TIRAR O ARROW DO INPUT NUMBER */
    /* Chrome, Safari, Edge, Opera */
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    & > input[type=number] {
      -moz-appearance: textfield;
    }

    }
  `;

ProductCard.propTypes = {
  productData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
