import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './Context/MyProvider';
import Checkout from './Pages/Checkout';
import CustomerOrder from './Pages/CustomerOrder';
import Login from './Pages/Login';
import OrderDetail from './Pages/OrderDetail';
import Products from './Pages/Products';
import Register from './Pages/Register';
import SellerOrdersDetails from './Pages/SellerOrdersDetails';

function App() {
  return (
    <Provider>
      <Switch>

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/customer/products">
          <Products />
        </Route>

        <Route exact path="/customer/orders">
          <CustomerOrder />
        </Route>

        <Route exact path="/customer/orders/:id">
          <OrderDetail />
        </Route>

        <Route exact path="/customer/checkout">
          <Checkout />
        </Route>

        <Route exact path="/seller/orders">
          <SellerOrdersDetails />
        </Route>
        
        <Route exact path="/register">
          <Register />
        </Route>

      </Switch>
    </Provider>
  );
}

export default App;
