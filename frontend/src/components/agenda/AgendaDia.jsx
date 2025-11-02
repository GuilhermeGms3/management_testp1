import React from "react";

export default function AgendaDia({ filtroData, filtroFuncionario }) {
  const agenda = [
    { hora: "09:00", cliente: "João Silva", serviço: "Corte clássico", status: "Concluído", funcionario: "Pedro", data: "2025-10-22" },
    { hora: "10:30", cliente: "Carlos Lima", serviço: "Barba", status: "Pendente", funcionario: "Maria", data: "2025-10-22" },
    { hora: "11:00", cliente: "Ana Paula", serviço: "Corte feminino", status: "Concluído", funcionario: "Pedro", data: "2025-10-21" },
  ];

  const agendaFiltrada = agenda.filter(item => 
    (!filtroData || item.data === filtroData) &&
    (!filtroFuncionario || item.funcionario === filtroFuncionario)
  );

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="mb-2 text-lg font-semibold">Agenda do Dia</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">Hora</th>
            <th className="p-2 border-b">Cliente</th>
            <th className="p-2 border-b">Serviço</th>
            <th className="p-2 border-b">Funcionário</th>
            <th className="p-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {agendaFiltrada.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-2">{item.hora}</td>
              <td className="p-2">{item.cliente}</td>
              <td className="p-2">{item.serviço}</td>
              <td className="p-2">{item.funcionario}</td>
              <td className={`p-2 font-semibold ${item.status === "Concluído" ? "text-green-600" : "text-yellow-600"}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
