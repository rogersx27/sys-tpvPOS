import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from './ProductForm';
import { ErrorAlert } from '../../components/shared/ErrorAlert';
import { useProductCreate } from '../../hooks/useProductCreate';
import { useToast } from '../../context/ToastContext';
import type { Product } from '../../types';

export const AddProduct = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSuccess = (product: Product) => {
    showToast(`Producto "${product.name}" creado correctamente`);
    navigate('/productos');
  };

  const { createProduct, isCreating, errors } = useProductCreate(handleSuccess);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Nuevo Producto
      </h1>

      <ErrorAlert errors={errors} />

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <ProductForm
          onSubmit={createProduct}
          isSubmitting={isCreating}
        />
      </div>
    </div>
  );
};