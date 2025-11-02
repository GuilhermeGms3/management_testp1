import React from "react";

export default function HistoricoCortes({ filtroData, filtroFuncionario }) {
  const historico = [
    { cliente: "João Silva", serviço: "Corte clássico", funcionario: "Pedro", data: "2025-10-20" },
    { cliente: "Ana Paula", serviço: "Corte feminino", funcionario: "Maria", data: "2025-10-19" },
    { cliente: "Carlos Lima", serviço: "Barba", funcionario: "Pedro", data: "2025-10-18" },
  ];

  const historicoFiltrado = historico.filter(item => 
    (!filtroData || item.data === filtroData) &&
    (!filtroFuncionario || item.funcionario === filtroFuncionario)
  );

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="mb-2 text-lg font-semibold">Histórico de Cortes</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">Cliente</th>
            <th className="p-2 border-b">Serviço</th>
            <th className="p-2 border-b">Funcionário</th>
            <th className="p-2 border-b">Data</th>
          </tr>
        </thead>
        <tbody>
          {historicoFiltrado.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2">{item.cliente}</td>
              <td className="p-2">{item.serviço}</td>
              <td className="p-2">{item.funcionario}</td>
              <td className="p-2">{item.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
