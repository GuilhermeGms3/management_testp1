import React from "react";

const FormCliente = ({ newEntry, setNewEntry, addEntry }) => (
  <form onSubmit={addEntry} className="flex flex-col gap-4 p-6 mt-2 bg-white rounded shadow-md">
    <input
      type="text"
      placeholder="Nome do cliente"
      className="p-2 border rounded"
      value={newEntry.name}
      onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
      required
    />
    <input
      type="text"
      placeholder="Tipo de corte"
      className="p-2 border rounded"
      value={newEntry.type}
      onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
      required
    />
    <input
      type="number"
      placeholder="Valor"
      className="p-2 border rounded"
      value={newEntry.value}
      onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
      required
    />
    <input
      type="date"
      className="p-2 border rounded"
      value={newEntry.date}
      onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
      required
    />
    <textarea
      placeholder="Notas do cliente"
      className="p-2 border rounded"
      value={newEntry.notes}
      onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
    />
    <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500">
      Salvar
    </button>
  </form>
);

export default FormCliente;
