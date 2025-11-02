import React from "react";

import { useState, useEffect } from "react";

const TransactionForm = ({ onClose, onSave, transaction }) => {
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("Entrada");
  const [categoria, setCategoria] = useState("Variável");
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (transaction) {
      setData(transaction.data);
      setDescricao(transaction.descricao);
      setTipo(transaction.tipo);
      setCategoria(transaction.categoria);
      setValor(transaction.valor);
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: transaction?.id, data, descricao, tipo, categoria, valor: parseFloat(valor) });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded shadow w-80">
        <h2 className="text-lg font-bold">{transaction ? "Editar" : "Adicionar"} Transação</h2>
        <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" className="w-full p-2 border rounded" required />
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full p-2 border rounded">
          <option value="Entrada">Entrada</option>
          <option value="Saída">Saída</option>
        </select>
        <select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full p-2 border rounded">
          <option value="Fixo">Fixo</option>
          <option value="Variável">Variável</option>
        </select>
        <input type="number" value={valor} onChange={e => setValor(e.target.value)} placeholder="Valor" className="w-full p-2 border rounded" required />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500">Cancelar</button>
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
