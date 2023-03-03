import React from 'react';
import CheckoutTable from '../Components/CheckoutTable';
import NavBar from '../Components/NavBar';
import { sellersMock } from '../Utils/checkoutPageMocks';

function Checkout() {
  const sellers = sellersMock;
  return (
    <>
      <NavBar />
      <CheckoutTable />

      <div>
        <form>
          <label htmlFor="seller-input">
            Vendedor Responsável:
            <select id="seller-input" data-testid="customer_checkout__select-seller">
              { sellers.map((seller) => (
                <option value={ seller } key={ seller }>
                  {seller}
                </option>
              )) }
            </select>
          </label>

          <label htmlFor="address-input">
            Endereço:
            <input
              type="text"
              id="address-input"
              data-testid="customer_checkout__input-address"
            />
          </label>

          <label htmlFor="address-input">
            Número:
            <input type="number" data-testid="customer_checkout__input-address-number" />
          </label>

          <button type="button" data-testid="customer_checkout__button-submit-order">
            Finalizar Pedido
          </button>
        </form>
      </div>
    </>
  );
}
export default Checkout;
