import React from "react";
import SidebarAgenda from "../../components/agenda/SidebarAgenda";
import HeaderAgenda from "../../components/agenda/HeaderAgenda";

export default function NomeDaPagina() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarAgenda />

      <div className="flex flex-col flex-1">
        <HeaderAgenda />

        <main className="p-6">
          <h1 className="mb-4 text-2xl font-bold">NomeDaPagina</h1>
          <p>Conteúdo da página vai aqui.</p>
        </main>
      </div>
    </div>
  );
}
