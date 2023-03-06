import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
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
    <div>
      <div data-testid={ `customer_products__element-card-title-${id}` }>
        { name }
      </div>

      <div data-testid={ `customer_products__element-card-price-${id}` }>
        {price.toString().replace('.', ',')}
      </div>

      <img
        src={ urlImage }
        alt="Imagem do Produto"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />

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
  );
}

ProductCard.propTypes = {
  productData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
