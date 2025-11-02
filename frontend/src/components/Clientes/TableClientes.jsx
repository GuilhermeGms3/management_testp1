import React from "react";

const TableClientes = ({ filteredHistory = [], setSelectedClient, removeEntry }) => {
  const data = filteredHistory || [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="sticky top-0 z-10 bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Nome</th>
            <th className="px-4 py-2 text-left">Serviço</th>
            <th className="px-4 py-2 text-left">Valor</th>
            <th className="px-4 py-2 text-left">Data</th>
            <th className="px-4 py-2 text-left">Notas</th>
            <th className="px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 text-center">Nenhum registro encontrado</td>
            </tr>
          ) : (
            data.map((entry, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{entry.name}</td>
                <td className="px-4 py-2">{entry.type}</td>
                <td className="px-4 py-2">R$ {entry.value}</td>
                <td className="px-4 py-2">{entry.date}</td>
                <td className="px-4 py-2">{entry.notes || "-"}</td>
                <td className="flex justify-center gap-2 px-4 py-2 text-center">
                  <button
                    className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => setSelectedClient(index)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => removeEntry(index)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Mobile responsivo */}
      <div className="flex flex-col gap-4 mt-4 md:hidden">
        {data.map((entry, index) => (
          <div key={index} className="p-4 border rounded shadow-sm">
            <div><strong>Nome:</strong> {entry.name}</div>
            <div><strong>Serviço:</strong> {entry.type}</div>
            <div><strong>Valor:</strong> R$ {entry.value}</div>
            <div><strong>Data:</strong> {entry.date}</div>
            <div><strong>Notas:</strong> {entry.notes || "-"}</div>
            <div className="flex gap-2 mt-2">
              <button
                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => setSelectedClient(index)}
              >
                Editar
              </button>
              <button
                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => removeEntry(index)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableClientes;
