import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ChakraProvider, extendTheme} from "@chakra-ui/react"
import {Provider} from "react-redux";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    // Define your color scheme here
    // For example:
    brand: {
      500: '#ff0000',
    },
  },
});

root.render(
  <React.StrictMode>
  <Provider store={store}>
  <ChakraProvider theme={theme}>
  <App />
  </ChakraProvider>
  </Provider>
    
  </React.StrictMode>
);

