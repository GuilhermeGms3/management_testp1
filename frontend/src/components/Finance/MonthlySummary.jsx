import React from "react";

const MonthlySummary = ({ entradas, saidasFixas, saidasVariaveis, lucro }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="mb-4 text-lg font-bold">Resumo Mensal</h2>
      <p>Entradas: R$ {entradas.toFixed(2)}</p>
      <p>Saídas Fixas: R$ {saidasFixas.toFixed(2)}</p>
      <p>Saídas Variáveis: R$ {saidasVariaveis.toFixed(2)}</p>
      <p className="mt-2 font-bold">Lucro: R$ {lucro.toFixed(2)}</p>
    </div>
  );
};

export default MonthlySummary;
