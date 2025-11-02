import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import HomeDono from "./pages/HomeDono";
import HomeFuncionario from "./pages/HomeFuncionario";
import Agenda from "./pages/AgendaAdmin";
import Financeiro from "./pages/Administrador/Financeiro";
import Clientes from "./pages/Clientes";
import Estoque from "./pages/Estoque";
import Chatbot from "./pages/Chatbot";
import Configuracoes from "./pages/Configuracoes";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import FinanceiroFuncionario from "./pages/Funcionario/FinanceiroFuncionario";
import Receitas from "./pages/Administrador/Receitas";

function App() {
  const { user } = useContext(AuthContext);

  if (!user) return <Login />;

  return (
    <Routes>
      {/* Redirecionamento inicial */}
      <Route
        path="/"
        element={
          <Navigate
            to={user.role === "dono" ? "/dashboard-dono" : "/dashboard-funcionario"}
          />
        }
      />

      {/* Rotas do Dono */}
      {user.role === "dono" && (
        <Route element={<MainLayout />}>
          <Route path="/dashboard-dono" element={<HomeDono />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      )}

      {/* Rotas do Funcionário */}
      {user.role === "funcionario" && (
        <Route element={<MainLayout />}>
          <Route path="/dashboard-funcionario" element={<HomeFuncionario />} />
          <Route path="/financeiro-funcionario" element={<FinanceiroFuncionario />} />
          <Route path="/agenda-funcionario" element={<Agenda />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
