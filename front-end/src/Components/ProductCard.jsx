import React from 'react';

function ProductCard() {
  const product = { id: 'xxxx', image: 'urlLink' };

  return (
    <div>
      <div data-testid={ `customer_products__element-card-title-${product.id}` }>
        Product.Name
      </div>

      <div data-testid={ `customer_products__element-card-price-${product.id}` }>
        Product.Price
      </div>

      <img
        src={ product.image }
        alt="Imagem do Produto"
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
      >
        +
      </button>

      <input
        type="number"
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
      >
        -
      </button>
    </div>
  );
}

export default ProductCard;
