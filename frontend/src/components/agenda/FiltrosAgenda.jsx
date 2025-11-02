import React from "react";

export default function FiltrosAgenda({ filtroData, setFiltroData, filtroFuncionario, setFiltroFuncionario }) {
  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded shadow md:flex-row">
      <input
        type="date"
        value={filtroData}
        onChange={(e) => setFiltroData(e.target.value)}
        className="px-2 py-1 border rounded"
      />
      <select
        value={filtroFuncionario}
        onChange={(e) => setFiltroFuncionario(e.target.value)}
        className="px-2 py-1 border rounded"
      >
        <option value="">Todos os funcionários</option>
        <option value="Pedro">Pedro</option>
        <option value="Maria">Maria</option>
        <option value="Lucas">Lucas</option>
      </select>
    </div>
  );
}
