import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { ProductCatalog } from '../pages/ProductCatalog';
import { SalesTerminal } from '../pages/SalesTerminal';
import { SalesHistory } from '../pages/SalesHistory';
import { Settings } from '../pages/Settings';
import { AddProduct } from '../pages/AddProduct';
import { EditProduct } from '../pages/EditProduct';
import { ProductDetails } from '../pages/ProductDetails';
import { ReceiptFormat } from '../pages/Settings/ReceiptFormat';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/productos" element={<ProductCatalog />} />
      <Route path="/productos/nuevo" element={<AddProduct />} />
      <Route path="/productos/:id/editar" element={<EditProduct />} />
      <Route path="/productos/:id" element={<ProductDetails />} />
      <Route path="/venta" element={<SalesTerminal />} />
      <Route path="/historial" element={<SalesHistory />} />
      <Route path="/configuraciones" element={<Settings />} />
      <Route path="/configuraciones/recibos" element={<ReceiptFormat />} />
    </Routes>
  );
};