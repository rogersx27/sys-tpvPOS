import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-600">€{item.price.toFixed(2)} x {item.quantity}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <span className="w-8 text-center">{item.quantity}</span>
          
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= item.stock}
            className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};