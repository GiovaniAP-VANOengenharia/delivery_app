import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../Context/MyContext';

function ProductCard(props) {
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useContext(MyContext);
  const { productData } = props;
  const { id, name, price, urlImage } = productData;

  const inputQuantity = (e) => {
    if (e.target.name === 'add') {
      setQuantity(quantity + 1);
    } else if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const checkLocalStorage = (findItem) => {
    let newCart = [];
    if (findItem && quantity > 0) {
      const newItem = { ...findItem, quantity };
      const filterCart = cart.filter((product) => product.id !== id);
      newCart = [...filterCart, newItem];
      setCart(newCart);
    } else if (quantity > 0) {
      newCart = [...cart, { id, name, price, quantity }];
      setCart(newCart);
    }
    if (findItem && !quantity) {
      const filterCart = cart.filter((product) => product.id !== id);
      newCart = [...filterCart];
      setCart(newCart);
    }
  };

  const toLocalStorage = () => {
    if (!cart.length && quantity > 0) {
      setCart([{ id, name, price, quantity }]);
    } else {
      const findItem = cart.find((product) => product.id === id);
      if (findItem && !quantity) setQuantity(findItem.quantity);
      checkLocalStorage(findItem);
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
