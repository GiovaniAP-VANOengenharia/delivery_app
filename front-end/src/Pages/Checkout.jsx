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
            <select id="seller-input">
              { sellers.map((seller) => (
                <option value={ seller } key={ seller }>
                  {seller}
                </option>
              )) }
            </select>
          </label>
        </form>
      </div>
    </>
  );
}

export default Checkout;
