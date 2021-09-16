import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from '@material-ui/core';
import './index.css';
import App from './App';
import theme from './style/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
