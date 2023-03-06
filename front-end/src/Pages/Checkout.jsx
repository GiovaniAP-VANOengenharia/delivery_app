import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import CheckoutTable from '../Components/CheckoutTable';
import NavBar from '../Components/NavBar';
import { requestSellers, setToken } from '../services/requests';
import { calcCartTotal } from '../Utils';

function Checkout() {
  const { userId, cart, setCart, setSale } = useContext(MyContext);
  const [sellers, setSellers] = useState([]);
  const [deliveryAddress, setAddress] = useState('');
  const [deliveryNumber, setNumber] = useState('');
  const [selectedSelr, setSelectedSelr] = useState('');
  const [sellerData, setSellerData] = useState([]);
  const history = useHistory();

  const getSellers = async () => {
    const userData = localStorage.getItem('user');
    const loginFields = JSON.parse(userData);
    setToken(loginFields.token);
    const result = await requestSellers('/customer/sellers');
    setSellerData(result.map((seller) => ({ name: seller.name, id: seller.id })));
    const sellersName = result.map((seller) => seller.name);
    setSellers(sellersName);
    setSelectedSelr(() => sellersName[0]);
  };

  const selectingSelr = ({ target }) => {
    setSelectedSelr(target.value);
    console.log(selectedSelr);
  };

  useEffect(() => {
    getSellers();
    const products = localStorage.getItem('products');
    const cartItems = JSON.parse(products);
    setCart(cartItems);
  }, []);

  const getSale = () => {
    const salr = sellerData.find((selr) => selectedSelr === selr.name);
    console.log(selectedSelr);
    const totalPrice = calcCartTotal(cart);
    setSale(() => ({
      userId,
      sallerId: salr.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cart,
    }));
  };

  const finish = async () => {
    await getSale();
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
            <select
              id="seller-input"
              data-testid="customer_checkout__select-seller"
              value={ selectedSelr }
              onChange={ selectingSelr }
            >
              { sellers.map((seller, i) => (
                <option value={ seller } key={ i }>
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
              value={ deliveryAddress }
              onChange={ ({ target }) => setAddress(target.value) }
            />
          </label>

          <label htmlFor="address-input">
            Número:
            <input
              type="number"
              data-testid="customer_checkout__input-address-number"
              value={ deliveryNumber }
              onChange={ ({ target }) => setNumber(target.value) }
            />
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
