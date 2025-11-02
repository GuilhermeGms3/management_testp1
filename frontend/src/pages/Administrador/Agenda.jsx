import React, { useState } from "react";
import SidebarAgenda from "../../components/agenda/SidebarAgenda";
import HeaderAgenda from "../../components/agenda/HeaderAgenda";
import CardsResumo from "../../components/agenda/CardsResumo";
import AgendaDia from "../../components/agenda/AgendaDia";
import HistoricoCortes from "../../components/agenda/HistoricoCortes";
import FiltrosAgenda from "../../components/agenda/FiltrosAgenda";

export default function Agenda() {
  const [filtroData, setFiltroData] = useState("");
  const [filtroFuncionario, setFiltroFuncionario] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarAgenda />

      <div className="flex flex-col flex-1">
        <HeaderAgenda />

        <main className="p-6 space-y-6">
          <CardsResumo filtroData={filtroData} filtroFuncionario={filtroFuncionario} />

          <FiltrosAgenda
            filtroData={filtroData}
            setFiltroData={setFiltroData}
            filtroFuncionario={filtroFuncionario}
            setFiltroFuncionario={setFiltroFuncionario}
          />

          <AgendaDia filtroData={filtroData} filtroFuncionario={filtroFuncionario} />

          <HistoricoCortes filtroData={filtroData} filtroFuncionario={filtroFuncionario} />
        </main>
      </div>
    </div>
  );
}
