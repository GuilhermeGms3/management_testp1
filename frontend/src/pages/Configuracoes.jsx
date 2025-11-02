import React, { useState } from "react";

const Configuracoes = () => {
  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#6366f1"); // Indigo

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const colors = ["#6366f1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="min-h-screen p-6 text-gray-800 bg-gray-50 dark:bg-gray-900 dark:text-gray-200">
      <h1 className="mb-6 text-2xl font-bold">Configurações</h1>

      {/* Tema */}
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Tema</h2>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-200 rounded dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Alternar para {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>

      {/* Cor principal */}
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Cor Primária</h2>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color}
              className="w-8 h-8 border-2 border-gray-300 rounded-full"
              style={{ backgroundColor: color }}
              onClick={() => setPrimaryColor(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Outras opções */}
      <div>
        <h2 className="mb-2 text-lg font-semibold">Outras opções</h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" /> Mostrar notificações
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" /> Habilitar animações
          </label>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
