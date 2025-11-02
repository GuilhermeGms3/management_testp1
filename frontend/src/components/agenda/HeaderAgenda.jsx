import React from "react";

export default function HeaderAgenda() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <h2 className="text-xl font-semibold">Agenda Administrativa</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="px-2 py-1 border rounded"
        />
        <span>Olá, Dono</span>
      </div>
    </header>
  );
}
