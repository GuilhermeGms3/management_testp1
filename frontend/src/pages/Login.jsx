import React from "react";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-gray-800 shadow-lg rounded-2xl w-96">
        <h1 className="mb-6 text-2xl font-bold text-center text-white">
          Login Barbearia
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-3 text-white bg-gray-700 rounded-lg focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 text-white bg-gray-700 rounded-lg focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          Acesse com:<br />
          <span className="text-white">dono@barbearia.com / 1234</span><br />
          <span className="text-white">funcionario@barbearia.com / 1234</span>
        </p>
      </div>
    </div>
  );
}
