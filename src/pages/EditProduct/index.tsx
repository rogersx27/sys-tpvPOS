import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductForm } from '../AddProduct/ProductForm';
import { useProductUpdate } from '../../hooks/useProductUpdate';
import { useToast } from '../../context/ToastContext';
import { ErrorAlert } from '../../components/shared/ErrorAlert';
import type { Product } from '../../types';

// TODO: Replace with actual API call
const fetchProduct = async (id: string): Promise<Product> => {
  // Simulated API call
  return {
    id,
    name: 'Café Americano',
    description: 'Café negro tradicional',
    price: 2.50,
    stock: 100,
    category: 'Beverages',
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    if (id) {
      fetchProduct(id).then(setProduct);
    }
  }, [id]);

  const handleSuccess = (updated: Product) => {
    showToast(`Producto "${updated.name}" actualizado correctamente`);
    navigate('/productos');
  };

  const { updateProduct, isUpdating, errors } = useProductUpdate(
    product!,
    handleSuccess
  );

  if (!product) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Editar Producto
      </h1>

      <ErrorAlert errors={errors} />

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <ProductForm
          initialData={product}
          onSubmit={updateProduct}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
};