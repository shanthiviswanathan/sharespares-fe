import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './store';

import './index.css';
import App from './App';

ReactDOM.render(
  <StoreProvider>
     <BrowserRouter>
       <App />
     </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root')
);