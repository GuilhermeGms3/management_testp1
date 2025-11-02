import React from "react";
import { Link } from "react-router-dom";

export default function SidebarFinanceiro() {
  const menu = [
    { name: "Visão Geral", path: "/financeiro" },
    { name: "Gestão de Receitas", path: "/receitas" },
    { name: "Despesas", path: "/financeiro/Despesas" },
    { name: "Relatórios", path: "/financeiro/relatorios" },
  ];

  return (
    <aside className="sticky top-0 flex flex-col w-56 p-4 text-white bg-gray-800 border-l border-gray-700">
      <h1 className="mb-6 text-xl font-bold">Financeiro</h1>
      <nav className="flex flex-col space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="px-3 py-2 transition rounded hover:bg-gray-700"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
