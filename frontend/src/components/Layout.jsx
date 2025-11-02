// src/components/Layout.jsx
import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar dinâmica */}
      <Sidebar role={user.role} />
      
      {/* Conteúdo principal */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
