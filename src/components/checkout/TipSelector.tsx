import React from 'react';

interface TipSelectorProps {
  total: number;
  onSelect: (amount: number) => void;
  selectedAmount?: number;
}

export const TipSelector: React.FC<TipSelectorProps> = ({
  total,
  onSelect,
  selectedAmount
}) => {
  const tipPercentages = [0, 5, 10, 15];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Propina
      </label>
      <div className="grid grid-cols-4 gap-2">
        {tipPercentages.map(percentage => {
          const amount = (total * percentage) / 100;
          const isSelected = selectedAmount === amount;

          return (
            <button
              key={percentage}
              type="button"
              onClick={() => onSelect(amount)}
              className={`
                py-2 px-4 rounded-lg text-sm font-medium
                ${isSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              {percentage}%
              {percentage > 0 && (
                <span className="block text-xs">
                  €{amount.toFixed(2)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};