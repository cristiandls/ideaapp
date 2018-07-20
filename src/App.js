import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import Root from './screens/Root';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
