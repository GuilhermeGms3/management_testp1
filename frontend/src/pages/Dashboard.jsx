const Dashboard = () => {
  const cards = [
    { title: "Faturamento Mensal", value: "R$ 12.450" },
    { title: "Clientes Atendidos", value: "240" },
    { title: "Agendamentos Hoje", value: "18" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500 text-sm">{card.title}</h2>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
