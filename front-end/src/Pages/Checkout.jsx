import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import MyContext from '../Context/MyContext';
import CheckoutTable from '../Components/CheckoutTable';
import NavBar from '../Components/NavBar';
import { requestSale, requestSellers, setToken } from '../services/requests';
import { calcCartTotal } from '../Utils';
import { lightTheme, darkTheme } from '../theme';
import GlobalStyle from '../theme/GlobalStyle';

function Checkout() {
  const [deliveryAddress, setAddress] = useState('');
  const [deliveryNumber, setNumber] = useState('');
  const [selectedSelr, setSelectedSelr] = useState('');
  const [sellerData, setSellerData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const {
    theme,
    setTheme,
    cart,
    setCart,
    setSale,
    setStatus,
    orders,
    setOrders,
  } = useContext(MyContext);

  const idUser = JSON.parse(localStorage.getItem('id'));

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
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'dark') setTheme('dark');
    if (!localTheme) localStorage.setItem('theme', 'light');
    getSellers();
    const products = localStorage.getItem('products');
    const cartItems = JSON.parse(products);
    setCart(cartItems);
  }, []);

  const getSale = () => {
    const totalPrice = calcCartTotal(cart);
    const selrId = sellerData.find((seller) => seller.id === Number(selectedSelr));
    setSale(() => ({
      userId: Number(idUser),
      sellerId: selrId.id,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      cart,
    }));
    return {
      userId: Number(idUser),
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
        localStorage.removeItem('products');
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
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <GlobalStyle />
      <NavBar />
      <CheckoutTable />
      <CheckoutContainer>
        <p className="title-form">Detalhes e Endereço Para Entrega</p>
        <div className="input-form">
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
        </div>

        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ finish }
          disabled={ isDisabled }
        >
          Finalizar Pedido
        </button>
      </CheckoutContainer>
    </ThemeProvider>
  );
}

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #cbcdd4;
  border-radius: 8px;
  width: 90%;
  padding: 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: 20px;
  .title-form{
    text-align: left;
    width: 92%;
    font-size: 25px;
  }
  .input-form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    & > label {
      display: flex;
      flex-direction: column;
      margin: 15px 15px 0;
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
  }
  & > button {
    width: 320px;
    height: 60px;
    border: 1px solid #036B52;
    border-radius: 5px;
    background-color: #036B52;
    font-size: 25px;
    margin: 0 0 20px;
    color: white;
    &:disabled {
      background-color: #036b5352;
    }
  }
`;

export default Checkout;
