import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { requestData } from '../services/requests';

function FinishSale() {
  const history = useHistory();

  const fetchProducts = async () => {
    const result = await requestData('/products');
    setProductsArray(result);
    history.push('/customer/order/1');
  };

  useEffect(() => {
    fetchProducts();
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
