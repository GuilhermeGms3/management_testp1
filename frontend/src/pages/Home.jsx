import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import {
  BarChart2,
  DollarSign,
  CalendarDays,
  MessageCircle,
  ArrowRightCircle,
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

const Home = () => {
  const { user } = useContext(AuthContext);
  const role = user.role; // 'dono' ou 'funcionario'

  const financialData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 11000 },
    { month: "Apr", revenue: 18000 },
    { month: "May", revenue: 16000 },
  ];

  const agendaData = [
    { day: 1, appointments: 5 },
    { day: 2, appointments: 7 },
    { day: 3, appointments: 4 },
    { day: 4, appointments: 9 },
    { day: 5, appointments: 6 },
  ];

  const stockData = [
    { item: "Shampoo", quantity: 12 },
    { item: "Pomada", quantity: 8 },
    { item: "Condicionador", quantity: 5 },
  ];

  const cards = [
    {
      title: "Financeiro",
      value: "R$ 12.540,00",
      icon: <DollarSign className="w-8 h-8 text-white" />,
      color: "bg-green-500",
      link: role === "dono" ? "/financeiro" : "/financeiro-funcionario",
    },
    {
      title: "Agenda",
      value: "7 horários hoje",
      icon: <CalendarDays className="w-8 h-8 text-white" />,
      color: "bg-yellow-500",
      link: role === "dono" ? "/agenda" : "/agenda-funcionario",
    },
    {
      title: "Estoque",
      value: "25 itens em estoque",
      icon: <BarChart2 className="w-8 h-8 text-white" />,
      color: "bg-blue-500",
      link: "/estoque", // mesmo para ambos
    },
    {
      title: "Chatbot",
      value: "10 mensagens novas",
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      color: "bg-purple-500",
      link: "/chatbot", // mesmo para ambos
    },
  ];

  return (
    <div className="flex flex-col min-h-screen gap-8 p-6 bg-gray-50">
      <h1 className="mb-4 text-3xl font-bold text-gray-700">Painel Principal</h1>

      {/* Cards principais */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{card.title}</h2>
              {card.icon}
            </div>
            <p className="text-lg font-bold">{card.value}</p>
            <Link
              to={card.link}
              className="inline-flex items-center mt-4 font-medium text-white hover:underline"
            >
              Abrir <ArrowRightCircle className="w-5 h-5 ml-2" />
            </Link>
          </div>
        ))}
      </div>

      {/* Gráficos resumidos */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Financeiro */}
        <div className="p-4 bg-white shadow rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Receita Mensal</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={financialData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10B981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Agenda */}
        <div className="p-4 bg-white shadow rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Atendimentos Últimos Dias</h2>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={agendaData}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="appointments" stroke="#FACC15" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Estoque */}
        <div className="p-4 bg-white shadow rounded-2xl">
          <h2 className="mb-2 text-lg font-semibold">Estoque</h2>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={stockData}>
              <XAxis dataKey="item" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#3B82F6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Próximos atendimentos resumidos */}
      <div className="p-4 bg-white shadow rounded-2xl">
        <h2 className="mb-4 text-lg font-semibold">Próximos Atendimentos</h2>
        <ul className="divide-y">
          <li className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Lucas Silva</p>
              <p className="text-sm text-gray-500">Corte de cabelo</p>
            </div>
            <span className="font-semibold text-yellow-500">10:00</span>
          </li>
          <li className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Maria Oliveira</p>
              <p className="text-sm text-gray-500">Barba</p>
            </div>
            <span className="font-semibold text-yellow-500">11:30</span>
          </li>
          <li className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Carlos Santos</p>
              <p className="text-sm text-gray-500">Corte + Barba</p>
            </div>
            <span className="font-semibold text-yellow-500">14:00</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
