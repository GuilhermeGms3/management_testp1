import React from "react";
import { PlusCircle } from "lucide-react";

const Filters = ({ search, setSearch, filterDate, setFilterDate, showForm, setShowForm }) => (
  <div className="flex flex-col items-center gap-4 sm:flex-row">
    <input
      type="text"
      placeholder="Buscar cliente..."
      className="flex-1 p-2 border rounded"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <input
      type="date"
      className="p-2 border rounded"
      value={filterDate}
      onChange={(e) => setFilterDate(e.target.value)}
    />
    <button
      className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500"
      onClick={() => { setSearch(""); setFilterDate(""); }}
    >
      Limpar filtros
    </button>
    <button
      className="flex items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700"
      onClick={() => setShowForm(!showForm)}
    >
      {showForm ? "Cancelar" : <><PlusCircle /> Adicionar Atendimento</>}
    </button>
  </div>
);

export default Filters;
