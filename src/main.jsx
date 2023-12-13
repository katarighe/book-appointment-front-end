import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';          
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import { Provider } from 'react-redux';
import store from './Redux/Stores/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
