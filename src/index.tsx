import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from '@material-ui/core';
import './index.css';
import App from './App';
import theme from './style/theme';
// import reportWebVitals from './reportWebVitals';

// reportWebVitals(console.log);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
