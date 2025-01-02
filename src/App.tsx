import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AppRoutes } from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ProductProvider>
          <Router>
            <Layout>
              <AppRoutes />
            </Layout>
          </Router>
        </ProductProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}