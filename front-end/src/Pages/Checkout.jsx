import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import CheckoutTable from '../Components/CheckoutTable';
import NavBar from '../Components/NavBar';
import { requestSellers, setToken } from '../services/requests';

function Checkout() {
  const { setCart } = useContext(MyContext);
  const history = useHistory();

  let sellersData = [];

  const getSellers = async () => {
    const user = localStorage.getItem('user');
    const loginFields = JSON.parse(user);
    setToken(loginFields.token);
    const result = await requestSellers('/customer/sellers');
    sellersData = result.map((seller) => ({ name: seller.name, id: seller.id }));
  };

  useEffect(() => {
    getSellers();
    const products = localStorage.getItem('products');
    const cartItems = JSON.parse(products);
    setCart(cartItems);
  }, []);

  const finish = () => {
    history.push('/finished');
  };

  return (
    <>
      <NavBar />
      <CheckoutTable />

      <div>
        <form>
          <label htmlFor="seller-input">
            Vendedor Responsável:
            <select id="seller-input" data-testid="customer_checkout__select-seller">
              { sellersData.map((seller, i) => (
                <option value={ seller.name } key={ i }>
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

          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ finish }
          >
            Finalizar Pedido
          </button>
        </form>
      </div>
    </>
  );
}
export default Checkout;
