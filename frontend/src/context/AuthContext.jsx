import React from "react";
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔐 Login simulado (pode ser trocado depois por API real)
  const login = (email, password) => {
    if (email === "dono@barbearia.com" && password === "1234") {
      const userData = { name: "Barbeiro Dono", role: "dono" };
      setUser(userData);
      navigate("/dashboard-dono");
    } else if (email === "funcionario@barbearia.com" && password === "1234") {
      const userData = { name: "Funcionário", role: "funcionario" };
      setUser(userData);
      navigate("/dashboard-funcionario");
    } else {
      alert("Credenciais inválidas!");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
