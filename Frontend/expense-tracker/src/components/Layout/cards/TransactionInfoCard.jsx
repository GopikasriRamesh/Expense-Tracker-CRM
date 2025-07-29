import React from 'react';
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2
} from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete
}) => {
  const getAmountStyles = () => {
    if (type === 'income') {
      return 'bg-green-50 text-green-700';
    } else {
      return 'bg-red-50 text-red-700';
    }
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 rounded-full">
        {icon ? (
          <img src={icon} alt="card icon" className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === 'income' ? '+' : '-'}${amount}
            </h6>
            {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
