import React from "react";

const FinanceTable = ({ transactions, onEdit, onRemove }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Valor</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className="border-b">
              <td className="px-4 py-2">{t.data ?? "—"}</td>
              <td className="px-4 py-2">{t.descricao ?? "—"}</td>
              <td className="px-4 py-2">{t.tipo ?? "—"}</td>
              <td className="px-4 py-2">{t.categoria ?? "—"}</td>
              <td className="px-4 py-2">R$ {(t.valor ?? 0).toFixed(2)}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(t)}
                  className="px-2 py-1 text-white bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => onRemove(t.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceTable;
