import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import NavBar from '../Components/NavBar';
import { requestSale } from '../services/requests';

function FinishSale() {
  const { sale, setSale } = useContext(MyContext);
  const history = useHistory();

  const apiSetSale = async () => {
    const response = await requestSale('/order', sale);
    console.log(response.result);
    if (response.result) {
      const { id } = response.result;
      setSale({ ...sale, id });
      history.push(`/customer/order/${id}`);
    }
  };

  useEffect(() => {
    apiSetSale();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>
        Compra finalizada com sucesso!
      </h1>
    </div>
  );
}

export default FinishSale;
