import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import CheckoutTable from '../Components/CheckoutTable';
import NavBar from '../Components/NavBar';
import { requestSellers, setToken } from '../services/requests';
import { calcCartTotal } from '../Utils';

function Checkout() {
  const { userId, cart, setCart, setSale } = useContext(MyContext);
  const [deliveryAddress, setAddress] = useState('');
  const [deliveryNumber, setNumber] = useState('');
  const [selectedSelr, setSelectedSelr] = useState('');
  const [sellerData, setSellerData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const getSellers = async () => {
    const userData = localStorage.getItem('user');
    const loginFields = JSON.parse(userData);
    setToken(loginFields.token);
    const result = await requestSellers('/customer/sellers');
    const sellers = result.map((seller) => ({ name: seller.name, id: seller.id }));
    setSellerData([{ name: 'Selecione' }, ...sellers]);
  };

  const selectingSelr = ({ target }) => {
    setSelectedSelr(target.value);
  };

  useEffect(() => {
    if (deliveryAddress && deliveryNumber && selectedSelr) {
      setIsDisabled(false);
    }
  }, [selectedSelr, deliveryAddress, deliveryNumber]);

  useEffect(() => {
    getSellers();
    const products = localStorage.getItem('products');
    const cartItems = JSON.parse(products);
    setCart(cartItems);
  }, []);

  const getSale = () => {
    const totalPrice = calcCartTotal(cart);
    const selrId = sellerData.find((seller) => seller.name === selectedSelr);
    setSale(() => ({
      userId,
      sellerId: selrId.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cart,
    }));
  };

  const finish = () => {
    getSale();
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
              { sellerData.map((seller, i) => (
                <option value={ seller.name } key={ i }>
                  {seller.name}
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
            disabled={ isDisabled }
          >
            Finalizar Pedido
          </button>
        </form>
      </div>
    </>
  );
}
export default Checkout;
