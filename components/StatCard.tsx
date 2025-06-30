
import React from 'react';
import type { StatCardData } from '../types';

const StatCard: React.FC<{ data: StatCardData }> = ({ data }) => {
  const { title, value, description, borderColor } = data;
  return (
    <div className={`bg-white p-5 rounded-lg shadow-md border-r-4 ${borderColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 font-semibold">{title}</h3>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-4">{description}</p>
    </div>
  );
};

export default StatCard;
