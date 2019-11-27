import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './store';
import * as action from './store/actions';
import { StateProvider } from './Context'
import './app.css';
store.dispatch(action.authCheck());

const initialState = {
  cart: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const{id,title,quantity,price}=action.payload;
      const newItem = {
        id,
        title,
       quantity,
       price
     }
     return { ...state, cart: [...state.cart, newItem] }
    case 'REMOVE_ITEM':
      const newItems = state.cart.filter(item => item.id !== id)
    return { ...state, cart: newItems }
    default:
      return initialState;
  }
}

const App = () => {
  return (
  <StateProvider initialState={initialState} reducer={reducer}>
  <Provider store={store}>
    <Router>
      <Switch>
        <Routes />
      </Switch>
    </Router>
  </Provider>
</StateProvider> 
  )
}

export default App

