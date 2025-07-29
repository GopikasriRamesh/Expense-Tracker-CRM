import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// ✅ Sample dummy data
const data = [
  { month: 'Jan', amount: 400 },
  { month: 'Feb', amount: 300 },
  { month: 'Mar', amount: 200 },
  { month: 'Apr', amount: 278 },
  { month: 'May', amount: 189 },
  { month: 'Jun', amount: 239 },
  { month: 'Jul', amount: 349 },
];

// ✅ Helper to color each bar differently
const getBarColor = (index) => {
  return index%2 ===0 ? '#875cf5':"#cfbefb";
};



// ✅ Optional: Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border p-2 rounded shadow text-sm">
        <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.category}</p>
        <p className= "texxt-sm text-gray-600">Amount: <span className="text-sm font-medium text-gray-900">${payload[0].payload.amount}</span></p>
      </div>
    );
  }
  return null;
};

const Custombarchart = () => {
  return (
    <div className="bg-white mt-6 p-4 rounded shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#555' }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#555' }}
            stroke="none"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Custombarchart;
