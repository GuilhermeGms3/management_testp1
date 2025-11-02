import React from "react";
import { Link } from "react-router-dom"; // IMPORTANTE: react-router-dom

export default function SidebarAgenda() {
  const menu = [
    { name: "Agenda", path: "/agenda" },
    { name: "Clientes", path: "/clientes" },
  ];

  return (
    <aside className="flex flex-col w-64 p-4 text-white bg-gray-800">
      <h1 className="mb-6 text-2xl font-bold">Barbearia</h1>
      <nav className="flex flex-col space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path} 
            className="px-3 py-2 rounded hover:bg-gray-700"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
