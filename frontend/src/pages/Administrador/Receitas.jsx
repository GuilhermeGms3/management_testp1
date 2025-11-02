import React, { useState } from "react";
import { useReceitas } from "../../hooks/useReceitas";

export default function Receitas() {
  const {
  receitas,
  adicionarReceita,
  atualizarStatus,
  removerReceita
} = useReceitas();


  // Modais
  const [showServicoModal, setShowServicoModal] = useState(false);
  const [showProdutoModal, setShowProdutoModal] = useState(false);
  const [showAssinaturaModal, setShowAssinaturaModal] = useState(false);

  const [novaEntrada, setNovaEntrada] = useState({
    nome: "",
    cliente: "",
    valor: "",
    formaPagamento: "Pix",
    status: "Pago",
  });

  const handleSubmit = (tipo) => {
    adicionarReceita({
      ...novaEntrada,
      tipo,
      valor: parseFloat(novaEntrada.valor),
      data: new Date().toISOString().split("T")[0],
      pagamentos: [
        {
          id: Date.now(),
          data: new Date().toISOString().split("T")[0],
          formaPagamento: novaEntrada.formaPagamento,
          valor: parseFloat(novaEntrada.valor),
          status: novaEntrada.status,
        },
      ],
    });

    setNovaEntrada({
      nome: "",
      cliente: "",
      valor: "",
      formaPagamento: "Pix",
      status: "Pago",
    });

    if (tipo === "Serviço") setShowServicoModal(false);
    if (tipo === "Produto") setShowProdutoModal(false);
    if (tipo === "Assinatura") setShowAssinaturaModal(false);
  };

  const renderModal = (tipo, showModal, setShowModal) => (
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Adicionar {tipo}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(tipo);
            }}
            className="space-y-3"
          >
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input
                type="text"
                value={novaEntrada.nome}
                onChange={(e) =>
                  setNovaEntrada({ ...novaEntrada, nome: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Cliente</label>
              <input
                type="text"
                value={novaEntrada.cliente}
                onChange={(e) =>
                  setNovaEntrada({ ...novaEntrada, cliente: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Valor</label>
              <input
                type="number"
                value={novaEntrada.valor}
                onChange={(e) =>
                  setNovaEntrada({ ...novaEntrada, valor: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Forma de Pagamento</label>
              <select
                value={novaEntrada.formaPagamento}
                onChange={(e) =>
                  setNovaEntrada({ ...novaEntrada, formaPagamento: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option>Pix</option>
                <option>Cartão</option>
                <option>Dinheiro</option>
                <option>Boleto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                value={novaEntrada.status}
                onChange={(e) =>
                  setNovaEntrada({ ...novaEntrada, status: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option>Pago</option>
                <option>Pendente</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen p-6 space-y-8 overflow-auto bg-gray-100">
      {/* Seção 1: Cadastro de Serviços */}
      <section className="p-6 space-y-3 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Cadastro de Serviços</h2>
        <button
          onClick={() => setShowServicoModal(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Adicionar Serviço
        </button>
        {renderModal("Serviço", showServicoModal, setShowServicoModal)}
      </section>

      {/* Seção 2: Registro de Vendas de Produtos */}
      <section className="p-6 space-y-3 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Registro de Vendas de Produtos</h2>
        <button
          onClick={() => setShowProdutoModal(true)}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Adicionar Produto
        </button>
        {renderModal("Produto", showProdutoModal, setShowProdutoModal)}
      </section>

      {/* Seção 3: Recebimentos Online e Offline */}
      <section className="p-6 space-y-3 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Recebimentos Online e Offline</h2>
        <p>Pix, Cartão, Dinheiro, Boleto</p>
      </section>

      {/* Seção 4: Pagamentos de Clientes Recorrentes */}
      <section className="p-6 space-y-3 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Pagamentos de Clientes Recorrentes</h2>
        <button
          onClick={() => setShowAssinaturaModal(true)}
          className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          Adicionar Assinatura / Pacote
        </button>
        {renderModal("Assinatura", showAssinaturaModal, setShowAssinaturaModal)}
      </section>

      {/* Seção 5: Integração POS / Gateways */}
      <section className="p-6 space-y-3 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Integração com POS / Gateways de Pagamento</h2>
        <p>Conecte com seu sistema de pagamentos online (Pix, Cartão, Boleto).</p>
      </section>

      {/* Seção 6: Histórico Detalhado */}
      <section className="p-6 space-y-3 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Histórico Detalhado de Pagamentos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Cliente</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Pagamento</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {receitas.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{r.tipo}</td>
                  <td className="px-4 py-2">{r.nome}</td>
                  <td className="px-4 py-2">{r.cliente}</td>
                  <td className="px-4 py-2">R$ {r.valor.toFixed(2)}</td>
                  <td className="px-4 py-2">{r.formaPagamento}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        r.status === "Pago"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{r.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
