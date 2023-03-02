import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ProductCard(props) {
  const [quantity, setQuantity] = useState(0);
  const { productData } = props;
  const { id, name, price, urlImage } = productData;

  const inputQuantity = (e) => {
    if (e.target.name === 'add') {
      setQuantity(quantity + 1);
    } else if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const checkLocalStorage = (products) => {
    let cart = JSON.parse(products);
    console.log(cart);
    const findItem = cart.find((product) => product.id === id);
    if (findItem && quantity > 0) {
      const newItem = { ...findItem, quantity };
      const filterCart = cart.filter((product) => product.id !== id);
      cart = [...filterCart, newItem];
    } else if (quantity > 0) {
      cart.push({ id, name, price, quantity });
    }
    if (!quantity) {
      const filterCart = cart.filter((product) => product.id !== id);
      cart = [...filterCart];
    }
    const toCart = JSON.stringify(cart);
    localStorage.setItem('products', toCart);
  };

  const toLocalStorage = () => {
    const products = localStorage.getItem('products');
    if (!products) {
      const toCart = JSON.stringify([{ id, name, price, quantity }]);
      localStorage.setItem('products', toCart);
    } else {
      checkLocalStorage(products);
    }
  };

  useEffect(() => {
    if (quantity < 0) setQuantity(0);
    toLocalStorage();
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
        {`R$ ${price}`}
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
