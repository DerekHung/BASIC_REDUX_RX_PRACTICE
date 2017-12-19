
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import DefaultLayout from './layouts/defaultLayout';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <DefaultLayout />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();