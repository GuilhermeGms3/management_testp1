import React, { useEffect, useState } from "react";

const ModalCliente = ({ selectedClient, setSelectedClient, history, setHistory }) => {
  const [clientData, setClientData] = useState(null);
  const [clientHistory, setClientHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (selectedClient !== null) {
      const client = history[selectedClient];
      setClientData(client);
      fetchClientHistory(client.id, page);
    }
  }, [selectedClient, page]);

  const fetchClientHistory = async (customerId, page) => {
    setLoadingHistory(true);
    try {
      const res = await fetch(
        `/api/customers/${customerId}/history?limit=${limit}&offset=${(page - 1) * limit}`
      );
      const data = await res.json();
      setClientHistory(data);
    } catch (err) {
      console.error(err);
      setClientHistory([]);
    }
    setLoadingHistory(false);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setClientHistory([]);
    setClientData(null);
    setPage(1);
  };

  if (selectedClient === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 overflow-auto bg-black/50">
      <div className="w-11/12 max-w-3xl p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{clientData?.name}</h2>
          <button onClick={closeModal} className="font-bold text-red-500">X</button>
        </div>

        {/* Cliente detalhes */}
        <div className="mb-4">
          <p><strong>Nome:</strong> {clientData?.name}</p>
          <p><strong>Último corte:</strong> {clientData?.date || "—"}</p>
          <p><strong>Notas:</strong> {clientData?.notes || "—"}</p>
        </div>

        {/* Histórico */}
        <div className="overflow-x-auto max-h-80">
          <table className="min-w-full border border-gray-200">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Data</th>
                <th className="px-4 py-2 border-b">Tipo</th>
                <th className="px-4 py-2 border-b">Valor</th>
                <th className="px-4 py-2 border-b">Notas</th>
                <th className="px-4 py-2 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loadingHistory ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center">Carregando...</td>
                </tr>
              ) : clientHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center">Nenhum histórico encontrado.</td>
                </tr>
              ) : (
                clientHistory.map((h, idx) => (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{h.date}</td>
                    <td className="px-4 py-2 border-b">{h.type}</td>
                    <td className="px-4 py-2 border-b">R$ {h.value}</td>
                    <td className="px-4 py-2 border-b">{h.notes}</td>
                    <td className="flex gap-2 px-4 py-2 border-b">
                      <button
                        onClick={() => alert("Editar ainda não implementado")}
                        className="px-2 py-1 text-white bg-blue-500 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => alert("Remover ainda não implementado")}
                        className="px-2 py-1 text-white bg-red-500 rounded"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {clientHistory.length > 0 && (
          <div className="flex justify-between mt-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>Página {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCliente;
