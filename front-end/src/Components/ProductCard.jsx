import React from 'react';
import PropTypes from 'prop-types';

function ProductCard(props) {
  const { productData } = props;
  const { id, name, price, urlImage } = productData;

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
      >
        +
      </button>

      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
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
