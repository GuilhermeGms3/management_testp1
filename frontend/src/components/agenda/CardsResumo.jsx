import React from "react";

export default function CardsResumo({ filtroData, filtroFuncionario }) {
  // Aqui você pode substituir por dados reais do backend
  const todosCards = [
    { title: "Clientes do mês", value: 120 },
    { title: "Agendamentos hoje", value: 15 },
    { title: "Serviços concluídos", value: 90 },
    { title: "Receita do dia", value: "R$ 1.500" },
  ];

  // Simulação de filtro (apenas exemplo)
  const cards = todosCards.map(card => ({
    ...card,
    value: filtroFuncionario ? card.value - 10 : card.value
  }));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div key={card.title} className="p-4 bg-white rounded shadow">
          <h3 className="text-gray-500">{card.title}</h3>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
