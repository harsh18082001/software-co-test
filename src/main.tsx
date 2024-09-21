import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from 'src/app';

import './css/style.css'

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from 'src/store';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  // </StrictMode>,
)
