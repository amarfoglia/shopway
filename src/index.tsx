import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from '@material-ui/core';
import './index.css';
import App from './App';
import theme from './style/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotifiesProvider } from './hooks/useNotifies';
// import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotifiesProvider>
            <App />
          </NotifiesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
