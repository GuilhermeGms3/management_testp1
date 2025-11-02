import React from "react";

const Dashboard = ({ totalToday, totalMonth, revenueMonth }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div className="p-6 text-white bg-blue-500 shadow-lg rounded-2xl">
      <h2 className="mb-2 text-lg font-semibold">Cortes hoje</h2>
      <p className="text-3xl">{totalToday}</p>
    </div>
    <div className="p-6 text-white bg-green-500 shadow-lg rounded-2xl">
      <h2 className="mb-2 text-lg font-semibold">Cortes no mês</h2>
      <p className="text-3xl">{totalMonth}</p>
    </div>
    <div className="p-6 text-white bg-yellow-500 shadow-lg rounded-2xl">
      <h2 className="mb-2 text-lg font-semibold">Receita mês</h2>
      <p className="text-3xl">R$ {revenueMonth}</p>
    </div>
  </div>
);

export default Dashboard;
