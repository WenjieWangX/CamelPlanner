import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ userData }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%" aspect={2.5 / 1}>
        <BarChart data={userData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="percentage" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
