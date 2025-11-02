import React from "react";

/**
 * Dashboard do estoque
 * - totalItems: quantidade total de produtos
 * - totalValue: valor total do estoque
 * - totalProducts: quantidade de produtos cadastrados
 */
const Dashboard = ({ totalItems, totalValue, totalProducts }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col items-center justify-center p-5 text-white bg-blue-600 shadow-md rounded-2xl">
        <h2 className="text-lg font-semibold">Total de Itens</h2>
        <p className="mt-2 text-4xl font-bold">{totalItems}</p>
      </div>

      <div className="flex flex-col items-center justify-center p-5 text-white bg-green-600 shadow-md rounded-2xl">
        <h2 className="text-lg font-semibold">Valor Total</h2>
        <p className="mt-2 text-4xl font-bold">R$ {totalValue.toFixed(2)}</p>
      </div>

      <div className="flex flex-col items-center justify-center p-5 text-white bg-gray-800 shadow-md rounded-2xl">
        <h2 className="text-lg font-semibold">Produtos Cadastrados</h2>
        <p className="mt-2 text-4xl font-bold">{totalProducts}</p>
      </div>
    </div>
  );
};

export default Dashboard;
