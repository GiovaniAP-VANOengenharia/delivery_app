import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import MyContext from '../Context/MyContext';

function ProductCard(props) {
  const [quantity, setQuantity] = useState(0);
  // const { cart, setCart } = useContext(MyContext);
  const { productData } = props;
  const { id, name, price, urlImage } = productData;

  const toCart = () => {
    const products = localStorage.getItem('products');
    let cart = [];
    let findItem = '';
    if (products) {
      cart = JSON.parse(products);
      findItem = cart.find((product) => product.id === id);
    }
    if (products && !findItem && quantity > 0) {
      const newCart = [...cart, { id, name, price, quantity }];
      const toLocalStorage = JSON.stringify(newCart);
      localStorage.setItem('products', toLocalStorage);
    }
    if (findItem && quantity > 0) {
      const newItem = { ...findItem, quantity };
      const filterCart = cart.filter((product) => product.id !== id);
      const newCart = [...filterCart, newItem];
      const toLocalStorage = JSON.stringify(newCart);
      localStorage.setItem('products', toLocalStorage);
    }
    if (!products && quantity > 0) {
      const toLocalStorage = JSON.stringify([{ id, name, price, quantity }]);
      localStorage.setItem('products', toLocalStorage);
    }
    if (findItem && !quantity) {
      const newCart = cart.filter((product) => product.id !== id);
      const toLocalStorage = JSON.stringify(newCart);
      localStorage.setItem('products', toLocalStorage);
    }
  };

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
