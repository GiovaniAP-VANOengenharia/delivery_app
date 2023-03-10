import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MyContext from '../Context/MyContext';
import CheckoutTable from '../Components/CheckoutTable';
import NavBar from '../Components/NavBar';
import { requestSale, requestSellers, setToken } from '../services/requests';
import { calcCartTotal } from '../Utils';

function Checkout() {
  const { cart, setCart, setSale, setStatus, orders, setOrders } = useContext(MyContext);
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
    const selrId = sellerData.find((seller) => seller.id === Number(selectedSelr));
    const loginFields = JSON.parse(localStorage.getItem('id'));
    setSale(() => ({
      userId: Number(loginFields),
      sellerId: selrId.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cart,
    }));
    return {
      userId: Number(loginFields),
      sellerId: selrId.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cart,
    };
  };

  const apiSetSale = async () => {
    try {
      const newSale = getSale();
      const response = await requestSale('/order', newSale);
      if (response.result) {
        const { id } = response.result;
        setOrders([...orders, { ...response.result, cart }]);
        history.push(`/customer/orders/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const finish = () => {
    apiSetSale();
    setStatus('');
  };

  return (
    <>
      <NavBar />
      <CheckoutContainer>
        <CheckoutTable />
        <p>Detalhes e Endereço Para Entrega</p>
        <form>
          <label htmlFor="seller-input">
            P. Vendedor Responsável:
            <select
              id="seller-input"
              data-testid="customer_checkout__select-seller"
              value={ selectedSelr }
              onChange={ selectingSelr }
            >
              { sellerData.map((seller, i) => (
                <option value={ seller.id } key={ i }>
                  {seller.id}
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
      </CheckoutContainer>
    </>
  );
}

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 25px;
    text-align: left;
    width: 63%;
  }
  & > form {
    border: 1px solid #CBD4D2;
    width: 61%;
    padding: 15px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    & > label {
      display: flex;
      flex-direction: column;
      margin: 15px;
      & > input {
        border: 1px solid #CBD4D2;
        border-radius: 5px;
        margin-top: 10px;
        padding: 13px;
      }
      & > select {
        border: 1px solid #CBD4D2;
        border-radius: 5px;
        margin-top: 10px;
        padding: 13px;
        width: 250px;
      }
      :nth-child(2){
        width: 550px;
      }
      :nth-child(3){
        width: 250px;
      }
    }
    & > button {
      width: 320px;
      height: 60px;
      border: 1px solid #036B52;
      border-radius: 5px;
      background-color: #036B52;
      font-size: 25px;
      margin: 0;
      color: white;
      &:disabled {
        background-color: #036b5352;
      }
    }
  }
`;

export default Checkout;
