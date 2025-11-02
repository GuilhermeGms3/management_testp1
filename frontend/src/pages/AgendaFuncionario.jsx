// DayModalAdmin.jsx
import React, { useState } from "react";

const DayModalAdmin = ({ day, appointments, addAppointment, closeModal }) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [employee, setEmployee] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (name && time && service && employee && price) {
      addAppointment(day, name, time, service, employee, parseFloat(price));
      setName("");
      setTime("");
      setService("");
      setEmployee("");
      setPrice("");
    }
  };

  const toggleStatus = (id) => {
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index].status = appointments[index].status === "Pendente" ? "Concluído" : "Pendente";
      // Forçar atualização (você pode substituir por estado externo se necessário)
    }
  };

  // Calcula receita do dia
  const totalRevenue = appointments.reduce((acc, a) => acc + (a.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl w-11/12 max-w-3xl max-h-[80vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-semibold">Agendamentos do dia {day}</h2>

        {/* Lista de agendamentos */}
        <ul className="divide-y">
          {appointments.map((a, i) => (
            <li key={a.id} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{a.time} - {a.client} ({a.service})</p>
                <p className="text-sm text-gray-500">Funcionário: {a.employee} | Status: {a.status} | Valor: R$ {a.price}</p>
              </div>
              <button
                onClick={() => toggleStatus(a.id)}
                className={`px-2 py-1 text-sm rounded ${a.status === "Pendente" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}
              >
                {a.status === "Pendente" ? "Concluir" : "Pendente"}
              </button>
            </li>
          ))}
        </ul>

        {/* Receita total do dia */}
        <div className="p-4 mt-4 bg-gray-100 rounded-lg">
          <p className="font-semibold">Receita total do dia: <span className="text-green-600">R$ {totalRevenue}</span></p>
        </div>

        {/* Adicionar novo agendamento */}
        <div className="flex flex-col gap-2 mt-4">
          <h3 className="font-semibold">Adicionar Agendamento</h3>
          <input
            type="text"
            placeholder="Nome do cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Horário (ex: 14:00)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Serviço"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Funcionário"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Valor"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            className="p-2 mt-2 text-white bg-blue-500 rounded"
            onClick={handleAdd}
          >
            Adicionar
          </button>
        </div>

        <button
          className="mt-4 text-red-500 hover:underline"
          onClick={closeModal}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default DayModalAdmin;
